// src/components/WalletConnect.js
import React, { useState } from 'react';
import { ethers } from 'ethers';

function WalletConnect() {
    const [account, setAccount] = useState(null);
    const [error, setError] = useState(null);

    const connectWallet = async () => {
        try {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                setAccount(address);
                setError(null); // Clear any previous errors
            } else {
                setError('No wallet detected. Please install Metamask.');
            }
        } catch (err) {
            setError('Error connecting wallet: ' + err.message);
        }
    };

    return (
        <div>
            <button onClick={connectWallet}>Connect Wallet</button>
            {account && <p>Connected as: {account}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default WalletConnect;
