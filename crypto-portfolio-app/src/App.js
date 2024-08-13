// src/App.js
import { useState } from 'react';
import WalletConnector from './components/WalletConnector';
import WatchList from './components/WatchList';
import HistoricalChart from './components/HistoricalChart';
import TokenTransfer from './components/TokenTransfer';

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [selectedTokenId, setSelectedTokenId] = useState('');

  return (
    <div className="App">
      <h1>Crypto Portfolio App</h1>
      <WalletConnector setWalletAddress={setWalletAddress} />
      {walletAddress && (
        <>
          <WatchList walletAddress={walletAddress} setSelectedTokenId={setSelectedTokenId} />
          <TokenTransfer walletAddress={walletAddress} />
          {selectedTokenId && <HistoricalChart tokenId={selectedTokenId} />}
        </>
      )}
    </div>
  );
}

export default App;
