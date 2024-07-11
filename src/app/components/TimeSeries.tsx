"use client"
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { Chart as ChartJS, TimeScale, LineElement, PointElement, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(TimeScale, LineElement, PointElement, LinearScale, Title, Tooltip, Legend);

const TimeSeriesChart = ({ data } : any) => {
  const chartData = {
    datasets: [
      {
        label: 'Sample Data',
        data: data,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options : any = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default TimeSeriesChart;
