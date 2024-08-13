import { Line } from 'react-chartjs-2';

function HistoricalChart({ data }) {
  const chartData = {
    labels: data.dates,
    datasets: [{
      label: 'Token Balance',
      data: data.balances,
      fill: false,
      borderColor: 'rgba(75,192,192,1)',
      tension: 0.1
    }]
  };

  return <Line data={chartData} />;
}

export default HistoricalChart;
