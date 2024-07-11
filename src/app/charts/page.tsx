import React from 'react'
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import TimeSeriesChart from '../components/TimeSeries';

export default function page() {
  const data = [
    { x: '2024-07-01', y: 10 },
    { x: '2024-07-02', y: 15 },
    { x: '2024-07-03', y: 20 },
    { x: '2024-07-04', y: 10 },
    // Add more data points here
  ];

  return (
    <div>
      <h1>Time Series Graph</h1>
      <TimeSeriesChart data={data} />
    </div>
  );
};

