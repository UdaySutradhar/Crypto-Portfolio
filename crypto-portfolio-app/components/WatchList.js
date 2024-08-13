import { useState } from 'react';
import { ethers } from 'ethers';
import { fetchHistoricalData } from '../services/historicalData';

function WatchList({ walletAddress }) {
  const [tokens, setTokens] = useState([]);
  const [tokenAddress, setTokenAddress] = useState('');
  const [historicalBalances, setHistoricalBalances] = useState([]);
  const [date, setDate] = useState(new Date());

  const addToken = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(tokenAddress, [
      "function balanceOf(address) view returns (uint256)"
    ], provider);
    const balance = await contract.balanceOf(walletAddress);
    setTokens([...tokens, { address: tokenAddress, balance: balance.toString() }]);
  };

  const getHistoricalBalance = async (token) => {
    try {
      const historicalData = await fetchHistoricalData(token.address, date);
      setHistoricalBalances([...historicalBalances, { token: token.address, data: historicalData }]);
    } catch (error) {
      console.error("Error fetching historical data:", error);
    }
  };

  return (
    <div>
      <input 
        value={tokenAddress} 
        onChange={(e) => setTokenAddress(e.target.value)} 
        placeholder="Token Address" 
      />
      <button onClick={addToken}>Add Token</button>
      
      <div>
        <label>Select Date: </label>
        <input 
          type="date" 
          value={date.toISOString().split('T')[0]} 
          onChange={(e) => setDate(new Date(e.target.value))} 
        />
      </div>
      
      <ul>
        {tokens.map((token, index) => (
          <li key={index}>
            {token.address}: {token.balance} 
            <button onClick={() => getHistoricalBalance(token)}>Get Historical Balance</button>
          </li>
        ))}
      </ul>
      
      {historicalBalances.length > 0 && (
        <div>
          <h2>Historical Balances</h2>
          <ul>
            {historicalBalances.map((item, index) => (
              <li key={index}>
                Token: {item.token} - Balance on {date.toISOString().split('T')[0]}: 
                {item.data[tokenAddress]?.USD || 'N/A'} USD
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}


function WatchList({ walletAddress }) {
  const [tokens, setTokens] = useState([]);
  const [tokenAddress, setTokenAddress] = useState('');

  const addToken = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(tokenAddress, [
      "function balanceOf(address) view returns (uint256)"
    ], provider);
    const balance = await contract.balanceOf(walletAddress);
    setTokens([...tokens, { address: tokenAddress, balance: balance.toString() }]);
  };

  return (
    <div>
      <input 
        value={tokenAddress} 
        onChange={(e) => setTokenAddress(e.target.value)} 
        placeholder="Token Address" 
      />
      <button onClick={addToken}>Add Token</button>
      <ul>
        {tokens.map((token, index) => (
          <li key={index}>{token.address}: {token.balance}</li>
        ))}
      </ul>
    </div>
  );
}

export default WatchList;
