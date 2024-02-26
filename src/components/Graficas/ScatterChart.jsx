import React from 'react';
import { Scatter } from 'react-chartjs-2';

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      max: 40, // Ajusta este valor según tus necesidades
    },
  },
};

const data = {
  datasets: [
    {
      label: 'Popularidad de Servicios',
      data: [
        { x: 'Reparación', y: 35 },
        { x: 'Renovación', y: 20 },
        { x: 'Implementación', y: 20 },
      ],
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ],
};

const ScatterChart = () => {
  return <Scatter data={data} options={options} />;
};

export default ScatterChart;
