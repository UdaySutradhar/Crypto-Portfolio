import React, { useState } from 'react';
import { ethers } from 'ethers';

function Allowance() {
  const [ownerAddress, setOwnerAddress] = useState('');
  const [spenderAddress, setSpenderAddress] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');
  const [allowance, setAllowance] = useState(null);
  const [error, setError] = useState('');

  const checkAllowance = async () => {
    try {
      if (!window.ethereum) {
        throw new Error('No crypto wallet found. Please install it.');
      }

      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const erc20ABI = [
        "function allowance(address owner, address spender) view returns (uint256)"
      ];
      const contract = new ethers.Contract(tokenAddress, erc20ABI, provider);

      const allowance = await contract.allowance(ownerAddress, spenderAddress);
      setAllowance(ethers.formatUnits(allowance, 18));
      setError('');
    } catch (error) {
      console.error('Error checking allowance:', error);
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Check Allowance</h2>
      <input
        type="text"
        placeholder="Owner Address"
        value={ownerAddress}
        onChange={(e) => setOwnerAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Spender Address"
        value={spenderAddress}
        onChange={(e) => setSpenderAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Token Contract Address"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
      />
      <button onClick={checkAllowance}>Check Allowance</button>
      {allowance && <p>Allowance: {allowance} tokens</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Allowance;
