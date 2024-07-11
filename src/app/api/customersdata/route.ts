import { NextResponse, NextRequest } from "next/server";

const customers : Customer[] = [
    {
    "id": 1,
    "name": "Ahmed Ali"
    },
    {
    "id": 2,
    "name": "Aya Elsayed"
    },
    
    {
    "id": 3,
    "name": "Mina Adel"
    },
    {
    "id": 4,
    "name": "Sarah Reda"
    },
    {
    "id": 5,
    "name": "Mohamed Sayed"
    }
]
export async function GET(request: NextRequest) { 
  
  try {
    return NextResponse.json({ customers: customers })
  } catch (error) {
    return NextResponse.json({ msg: "Network Error", error }, {status:500 })
  }
}
