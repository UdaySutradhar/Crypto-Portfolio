import React, { useState } from 'react';
import { ethers } from 'ethers';
import WalletConnect from './components/WalletConnect';
import AddTokenForm from './components/AddTokenForm';
import Token from './components/Token';
import HistoricalBalance from './components/HistoricalBalance';
import AllowanceChecker from './components/AllowanceChecker';
import './App.css';
import TokenChart from './components/TokenChart';

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [tokens, setTokens] = useState([]);

  const addToken = (token) => {
    setTokens([...tokens, token]);
  };

  const removeToken = (tokenAddress) => {
    setTokens(tokens.filter(token => token.address !== tokenAddress));
  };

  const historicalData = {
    dates: ['2024-08-01', '2024-08-02', '2024-08-03'],
    balances: [1.5, 1.7, 2.0],
  };

  // Fetch Historical Balance
  const fetchHistoricalBalance = async (walletAddress, tokenAddress, date) => {
    const response = await fetch(`https://api.covalenthq.com/v1/1/address/${walletAddress}/balances_v2/?quote-currency=USD&format=JSON&key=YOUR_API_KEY`);
    const data = await response.json();
    const tokenData = data.data.items.find(item => item.contract_address.toLowerCase() === tokenAddress.toLowerCase());
    return tokenData ? tokenData.balance / Math.pow(10, tokenData.contract_decimals) : 0;
  };

  // Fetch Allowance
  const fetchAllowance = async (walletAddress, tokenAddress, spenderAddress) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(tokenAddress, ["function allowance(address owner, address spender) view returns (uint256)"], provider);
    const allowance = await contract.allowance(walletAddress, spenderAddress);
    return ethers.utils.formatUnits(allowance, 18);  // Assuming token has 18 decimals
  };

  return (
    <div className="App">
      <h1>Crypto Portfolio App</h1>
      <WalletConnect setWalletAddress={setWalletAddress} />
      {walletAddress && (
        <div>
          <h2>Watch List</h2>
          {tokens.map((token, index) => (
            <Token 
              key={index} 
              token={token} 
              removeToken={removeToken} 
              walletAddress={walletAddress} 
            />
          ))}
          <AddTokenForm addToken={addToken} />

          <div className="App">
      {/* Other components */}
      <TokenChart data={historicalData} />
    </div>

          <h2>Historical Balance</h2>
          {tokens.map((token, index) => (
            <HistoricalBalance 
              key={index} 
              fetchHistoricalBalance={fetchHistoricalBalance} 
              tokenAddress={token.address} 
              walletAddress={walletAddress} 
            />
          ))}

          <h2>Allowance Checker</h2>
          {tokens.map((token, index) => (
            <AllowanceChecker 
              key={index} 
              fetchAllowance={fetchAllowance} 
              tokenAddress={token.address} 
              walletAddress={walletAddress} 
            />
          ))}
        </div>
      )}
    </div>
    
  );
}

export default App;
