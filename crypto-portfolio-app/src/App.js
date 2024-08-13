import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import WalletConnector from './components/WalletConnector';
import WatchList from './components/WatchList';
import TokenTransfer from './components/TokenTransfer';

function App() {
  const [walletAddress, setWalletAddress] = useState('');

  const handleConnect = (address) => {
    setWalletAddress(address);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Crypto-Portfolio App</h1>
        {/* Integrating the WalletConnector component */}
        <WalletConnector onConnect={handleConnect} />
        
        {/* Pass the walletAddress to the WatchList component */}
        {walletAddress && <WatchList walletAddress={walletAddress} />}

        {/* Pass the walletAddress to the TokenTransfer component */}
        {walletAddress && <TokenTransfer walletAddress={walletAddress} />}
      </header>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Crypto-Portfolio App</h1>
        {WalletConnector.js}
        <WalletConnector />
      </header>
    </div>
  );
}

function App() {
  const [walletAddress, setWalletAddress] = useState('');

  const handleConnect = (address) => {
    setWalletAddress(address);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Crypto-Portfolio App</h1>
        {/* Integrating the WalletConnector component */}
        <WalletConnector onConnect={handleConnect} />
        
        {/* Pass the walletAddress to the WatchList component */}
        {walletAddress && <WatchList walletAddress={walletAddress} />}
      </header>
    </div>
  );
}


export default App;
