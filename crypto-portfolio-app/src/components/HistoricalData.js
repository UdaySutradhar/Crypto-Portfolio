import React, { useState } from 'react';
import { getHistoricalBalances } from '../services/tokenService';

const HistoricalData = ({ tokenAddress, walletAddress }) => {
    const [balances, setBalances] = useState([]);

    const fetchHistoricalBalances = async () => {
        const dates = ['2024-01-01', '2024-06-01', '2024-08-01']; // Example dates
        const result = await getHistoricalBalances(tokenAddress, walletAddress, dates);
        setBalances(result);
    };

    return (
        <div>
            <button onClick={fetchHistoricalBalances}>Get Historical Balances</button>
            <ul>
                {balances.map((balance, index) => (
                    <li key={index}>{balance.date}: {balance.balance}</li>
                ))}
            </ul>
        </div>
    );
};

export default HistoricalData;
