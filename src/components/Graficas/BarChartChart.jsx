import React from 'react';
import { Bar } from 'react-chartjs-2';

const options = {
  responsive: true,
  maintainAspectRatio: false,
};

const data = {
  labels: ['Cable Cobre', 'Transistores', 'Caja', 'Cable Red', 'Cortador'],
  datasets: [
    {
      label: 'Productos mas usados del mes',
      data: [35, 20, 20, 15, 10],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const BarChart = () => {
  return <Bar data={data} options={options} />;
};

export default BarChart;
