import React, { useState } from 'react';
import Header from './components/Header';
import WatchList from './components/WatchList';
import HistoricalData from './components/HistoricalData';
import AllowanceChecker from './components/AllowanceChecker';
import TokenTransfer from './components/TokenTransfer';
import './styles.css';

const App = () => {
  const [walletAddress, setWalletAddress] = useState('');

  return (
    <div className="App">
      <Header setWalletAddress={setWalletAddress} />
      <WatchList walletAddress={walletAddress} />
      <HistoricalData walletAddress={walletAddress} />
      <AllowanceChecker walletAddress={walletAddress} />
      <TokenTransfer walletAddress={walletAddress} />
    </div>
  );
};

export default App;
