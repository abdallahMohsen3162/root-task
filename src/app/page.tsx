"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import TimeSeriesChart from "./components/TimeSeries";
const host = "json-server --watch db.json --port 3001"

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [customerMapping, setCustomerMapping] = useState<Map<number, string>>(new Map()); // id => name
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState({
    name: '',
    amount: 0
  })
  const [data, setData] = useState<TimeStamp[]>([]);
  const [userId, setUserid] = useState(-1);


  useEffect(() => {
    fetch('http://localhost:3001/customers', {method: 'GET'}).then((res) => res.json())
    .then((data) => {
      let mp = new Map<number, string>();
      for(let i = 0; i < data.customers.length; i++){
        mp.set(data.customers[i].id, data.customers[i].name)
      }
      console.log(mp);
      setCustomerMapping(mp)
      
    })

    fetch('http://localhost:3001/transactions', {method: 'GET'}).then((res) => res.json())
    .then((data) => {

      setTransactions(data.transactions)
      setLoading(false)
      
    })

    
    return () => {
      setTransactions([])
    }
  }, [])



  useEffect(() => {
    setData([])
    for(let i = 0; i < transactions.length; i++){
      if(userId === transactions[i].customer_id)
        setData(data => [...data, {x: transactions[i].date, y: transactions[i].amount}])
    }
    console.log(data);
    
    
  }, [userId])

  if(loading){
    return <div className="text-center">
      <h4>Loading Data...</h4>
    </div>
  }
  return (
    <div className="container">
     
      <table className="table">
          <thead>
            <tr>
              <th scope="col">Customer name</th>
              <th scope="col">Amount</th>
              <th scope="col">Date</th>
            </tr>
          </thead>

          <tbody>

          {
            transactions.map((transaction: Transaction, idx: number) => {
              const customerName = customerMapping.get(transaction.customer_id)?.toLocaleLowerCase();
              const nameMatches = customerName?.includes(search.name.toLocaleLowerCase());
              const amountMatches = search.amount === 0 || transaction.amount == search.amount;

              if (nameMatches || amountMatches) {
                return (
                  <tr className="table-click" key={idx} onClick={() => setUserid(transaction.customer_id)}>
                    <th scope="row">{customerName}</th>
                    <td>{transaction.amount}</td>
                    <td>{transaction.date}</td>
                  </tr>
                );
              }
              return null;
            })
          }
            <tr>
              <td>
                <input 
                onChange={(e) => setSearch({...search, name: e.target.value})} 
                type="text" 
                placeholder="Customer"/>
              </td>

              <td>
               <input 
                onChange={(e) => setSearch({...search, amount: parseInt(e.target.value)})} 
                type="text" 
                placeholder="Amount"/>
              </td>

            </tr>
          </tbody>
        </table>

        {
          userId != -1 && <TimeSeriesChart data={data} />
        }
    </div>
  );
}
