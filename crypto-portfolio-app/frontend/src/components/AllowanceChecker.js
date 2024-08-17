// src/components/AllowanceChecker.js
import React, { useState } from 'react';

const AllowanceChecker = ({ fetchAllowance, tokenAddress, walletAddress }) => {
  const [spenderAddress, setSpenderAddress] = useState("");
  const [allowance, setAllowance] = useState(null);

  const handleCheckAllowance = async () => {
    const allowance = await fetchAllowance(walletAddress, tokenAddress, spenderAddress);
    setAllowance(allowance);
  };

  return (
    <div>
      <input 
        type="text" 
        value={spenderAddress} 
        onChange={(e) => setSpenderAddress(e.target.value)} 
        placeholder="Spender Address" 
      />
      <button onClick={handleCheckAllowance}>Check Allowance</button>
      {allowance !== null && <p>Allowance: {allowance} tokens</p>}
    </div>
  );
};

export default AllowanceChecker;
