// src/components/WalletConnector.js
import { useState } from 'react';
import { Web3Provider } from 'ethers';

function WalletConnector({ setWalletAddress }) {
  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      setWalletAddress(await signer.getAddress());
    } else {
      alert('Please install MetaMask!');
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
    </div>
  );
}

export default WalletConnector;
