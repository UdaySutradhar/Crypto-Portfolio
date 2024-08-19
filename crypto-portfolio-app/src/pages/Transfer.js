import React, { useState } from 'react';
import { ethers } from 'ethers';

const Transfer = () => {
    const [recipientAddress, setRecipientAddress] = useState('');
    const [tokenAddress, setTokenAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [transactionHash, setTransactionHash] = useState('');
    const [error, setError] = useState('');

    const transferTokens = async () => {
        try {
            if (!window.ethereum) {
                throw new Error('No crypto wallet found. Please install it.');
            }

            // Request account access if needed
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            // Set up the provider and signer
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            // Set up the ERC-20 contract
            const erc20ABI = [
                "function transfer(address to, uint amount) returns (bool)"
            ];
            const contract = new ethers.Contract(tokenAddress, erc20ABI, signer);

            // Convert the amount to the correct units (assuming 18 decimals)
            const amountInWei = ethers.utils.parseUnits(amount, 18);

            // Execute the transfer
            const transaction = await contract.transfer(recipientAddress, amountInWei);

            // Wait for the transaction to be mined
            const receipt = await transaction.wait();

            setTransactionHash(receipt.transactionHash);
            setError('');
        } catch (error) {
            console.error('Error transferring tokens:', error);
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Transfer Tokens</h2>
            <label>
                Recipient Address:
                <input 
                    type="text" 
                    value={recipientAddress} 
                    onChange={(e) => setRecipientAddress(e.target.value)} 
                />
            </label>
            <br />
            <label>
                Token Contract Address:
                <input 
                    type="text" 
                    value={tokenAddress} 
                    onChange={(e) => setTokenAddress(e.target.value)} 
                />
            </label>
            <br />
            <label>
                Amount:
                <input 
                    type="text" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                />
            </label>
            <br />
            <button onClick={transferTokens}>Transfer</button>

            {transactionHash && (
                <div>
                    <h3>Transaction Successful</h3>
                    <p>Transaction Hash: {transactionHash}</p>
                </div>
            )}

            {error && (
                <div>
                    <h3 style={{ color: 'red' }}>Error</h3>
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};

export default Transfer;
