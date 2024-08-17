import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const Token = ({ token, removeToken, walletAddress }) => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(token.address, ["function balanceOf(address owner) view returns (uint256)"], provider);
      const balance = await contract.balanceOf(walletAddress);
      setBalance(ethers.utils.formatUnits(balance, 18));
    };
    fetchBalance();
  }, [token.address, walletAddress]);

  return (
    <div>
      <p>{token.name} ({token.symbol}): {balance}</p>
      <button onClick={() => removeToken(token.address)}>Remove</button>
    </div>
  );
};

export default Token;
