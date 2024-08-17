import React, { useState } from 'react';
import { ethers } from 'ethers';

const Transfer = ({ tokenAddress, walletAddress }) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const handleTransfer = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(tokenAddress, ["function transfer(address to, uint256 amount) returns (bool)"], signer);
    const amountInWei = ethers.utils.parseUnits(amount, 18);
    await contract.transfer(recipient, amountInWei);
  };

  return (
    <div>
      <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="Recipient Address" />
      <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
      <button onClick={handleTransfer}>Transfer</button>
    </div>
  );
};

export default Transfer;
