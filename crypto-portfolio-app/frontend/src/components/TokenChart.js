import React from 'react';
import { Line } from 'react-chartjs-2';

const TokenChart = ({ data }) => {
  const chartData = {
    labels: data.dates,
    datasets: [
      {
        label: 'Token Balance',
        data: data.balances,
        fill: false,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return <Line data={chartData} />;
};

export default TokenChart;
