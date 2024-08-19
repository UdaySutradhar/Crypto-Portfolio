
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const History = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [historicalData, setHistoricalData] = useState([]);

    const fetchHistoricalData = async () => {
        const tokenId = 'bitcoin'; 
        const start = new Date(startDate).getTime() / 1000; 
        const end = new Date(endDate).getTime() / 1000;

        try {
            const response = await axios.get(
                `https://api.coingecko.com/api/v3/coins/${tokenId}/market_chart/range`,
                {
                    params: {
                        vs_currency: 'usd',
                        from: start,
                        to: end,
                    },
                }
            );
            setHistoricalData(response.data.prices);
        } catch (error) {
            console.error('Error fetching historical data:', error);
        }
    };

    return (
        <div>
            <h2>Historical Data</h2>
            <label>
                Start Date:
                <input 
                    type="date" 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)} 
                />
            </label>
            <label>
                End Date:
                <input 
                    type="date" 
                    value={endDate} 
                    onChange={(e) => setEndDate(e.target.value)} 
                />
            </label>
            <button onClick={fetchHistoricalData}>Fetch Data</button>

            {historicalData.length > 0 && (
                <div>
                    <h3>Price Data (USD):</h3>
                    <ul>
                        {historicalData.map((price, index) => (
                            <li key={index}>
                                Date: {new Date(price[0]).toLocaleDateString()} - Price: ${price[1].toFixed(2)}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default History;
