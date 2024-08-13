// src/components/HistoricalChart.js
import { Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { fetchHistoricalData } from '../services/historicalData';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function HistoricalChart({ tokenId }) {
  const [data, setData] = useState({ dates: [], balances: [] });
  const [fromDate, setFromDate] = useState(new Date('2023-01-01'));
  const [toDate, setToDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchHistoricalData(tokenId, fromDate, toDate);
      const dates = result.prices.map(price => new Date(price[0] * 1000).toLocaleDateString());
      const balances = result.prices.map(price => price[1]);

      setData({ dates, balances });
    };

    fetchData();
  }, [tokenId, fromDate, toDate]);

  const chartData = {
    labels: data.dates,
    datasets: [{
      label: 'Token Balance (USD)',
      data: data.balances,
      fill: false,
      borderColor: 'rgba(75,192,192,1)',
      tension: 0.1
    }]
  };

  return (
    <div>
      <input
        type="date"
        value={fromDate.toISOString().substring(0, 10)}
        onChange={(e) => setFromDate(new Date(e.target.value))}
      />
      <input
        type="date"
        value={toDate.toISOString().substring(0, 10)}
        onChange={(e) => setToDate(new Date(e.target.value))}
      />
      <Line data={chartData} />
    </div>
  );
}

export default HistoricalChart;
