// src/components/TokenTransfer.js
import { useState } from 'react';
import { Web3Provider, Contract, utils } from 'ethers';

function TokenTransfer({ walletAddress }) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');

  const transferTokens = async () => {
    if (!walletAddress) {
      alert('Please connect your wallet first!');
      return;
    }
    const provider = new Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new Contract(tokenAddress, [
      "function transfer(address to, uint amount) returns (bool)"
    ], signer);

    const tx = await contract.transfer(recipient, utils.parseUnits(amount, 18));
    await tx.wait();
    alert('Transfer successful!');
  };

  return (
    <div>
      <input 
        value={recipient} 
        onChange={(e) => setRecipient(e.target.value)} 
        placeholder="Recipient Address" 
      />
      <input 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
        placeholder="Amount" 
      />
      <input 
        value={tokenAddress} 
        onChange={(e) => setTokenAddress(e.target.value)} 
        placeholder="Token Address" 
      />
      <button onClick={transferTokens}>Transfer</button>
    </div>
  );
}

export default TokenTransfer;
