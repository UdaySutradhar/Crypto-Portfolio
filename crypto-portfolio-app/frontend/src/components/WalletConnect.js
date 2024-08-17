// src/components/WalletConnect.js
import React, { useState } from 'react';
import { ethers } from 'ethers';

const WalletConnect = ({ setWalletAddress }) => {
  const [errorMessage, setErrorMessage] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
      } catch (error) {
        setErrorMessage("Failed to connect wallet");
      }
    } else {
      setErrorMessage("Please install Metamask");
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default WalletConnect;
