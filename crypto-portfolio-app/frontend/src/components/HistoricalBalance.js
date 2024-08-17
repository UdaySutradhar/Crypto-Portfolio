import React, { useEffect, useState } from 'react';
import HistoricalBalanceChart from './HistoricalBalanceChart';

function HistoricalBalance({ fetchHistoricalBalance, tokenAddress, walletAddress }) {
    const [historicalData, setHistoricalData] = useState({ dates: [], balances: [] });

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchHistoricalBalance(walletAddress, tokenAddress);
            setHistoricalData(data);
        };
        fetchData();
    }, [walletAddress, tokenAddress]);

    return (
        <div>
            <h2>Historical Balance for {tokenAddress}</h2>
            <HistoricalBalanceChart historicalData={historicalData} />
        </div>
    );
}

export default HistoricalBalance;
