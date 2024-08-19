import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Button, Typography } from '@mui/material';

function WalletConnect() {
    const [walletAddress, setWalletAddress] = useState("");

    async function connectWallet() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

                if (accounts.length === 0) {
                    alert("No accounts found. Please make sure you have an account in MetaMask.");
                } else {
                    setWalletAddress(accounts[0]);
                }
            } catch (error) {
                if (error.code === 4001) { // EIP-1193 userRejectedRequest error
                    alert("Connection request was rejected by the user.");
                } else {
                    console.error("An unexpected error occurred:", error);
                }
            }
        } else {
            alert("MetaMask is not installed. Please install it to use this app.");
        }
    }

    return (
        <div>
            {walletAddress ? (
                <Typography variant="h6">Connected: {walletAddress}</Typography>
            ) : (
                <Button variant="contained" color="primary" onClick={connectWallet}>
                    Connect Wallet
                </Button>
            )}
        </div>
    );
}

export default WalletConnect;
