import React, { useState } from 'react';

function HistoricalData() {
  const [tokenAddress, setTokenAddress] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [historicalData, setHistoricalData] = useState([]);
  const [error, setError] = useState('');

  const fetchHistoricalData = async () => {
    try {
      const data = [
        { date: '2023-01-01', price: '100' },
        { date: '2023-01-02', price: '105' },
        { date: '2023-01-03', price: '110' },
      ];
      setHistoricalData(data);
      setError('');
    } catch (error) {
      console.error('Error fetching historical data:', error);
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Historical Data</h2>
      <input
        type="text"
        placeholder="Token Contract Address"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
      />
      <input
        type="date"
        placeholder="From Date"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
      />
      <input
        type="date"
        placeholder="To Date"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
      />
      <button onClick={fetchHistoricalData}>Fetch Data</button>
      <div>
        {historicalData.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {historicalData.map((data, index) => (
                <tr key={index}>
                  <td>{data.date}</td>
                  <td>{data.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default HistoricalData;
