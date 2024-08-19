import React, { useState } from 'react';
import { ethers } from 'ethers';

function Transfer() {
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

      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = provider.getSigner();

      const erc20ABI = [
        "function transfer(address to, uint amount) returns (bool)"
      ];
      const contract = new ethers.Contract(tokenAddress, erc20ABI, signer);

      const amountInWei = ethers.parseUnits(amount, 18);
      const transaction = await contract.transfer(recipientAddress, amountInWei);
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
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipientAddress}
        onChange={(e) => setRecipientAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Token Contract Address"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={transferTokens}>Transfer</button>
      {transactionHash && <p>Transaction Hash: {transactionHash}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Transfer;
