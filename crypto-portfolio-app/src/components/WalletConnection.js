import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const WalletConnection = () => {
    const [walletAddress, setWalletAddress] = useState('');
    const [web3, setWeb3] = useState(null);

    useEffect(() => {
        if (window.ethereum) {
            const web3Instance = new Web3(window.ethereum);
            setWeb3(web3Instance);
        } else {
            alert("Please install MetaMask!");
        }
    }, []);

    const connectWallet = async () => {
        if (web3) {
            try {
                const accounts = await web3.eth.requestAccounts();
                setWalletAddress(accounts[0]);
            } catch (error) {
                console.error("User denied wallet connection");
            }
        }
    };

    return (
        <div>
            <button onClick={connectWallet}>Connect Wallet</button>
            {walletAddress && <p>Connected Address: {walletAddress}</p>}
        </div>
    );
};

export default WalletConnection;
