// src/components/WatchList.js
import { useState } from 'react';
import { Web3Provider, Contract, utils } from 'ethers';

function WatchList({ walletAddress, setSelectedTokenId }) {
  const [tokens, setTokens] = useState([]);
  const [tokenAddress, setTokenAddress] = useState('');

  const addToken = async () => {
    if (!walletAddress) {
      alert('Please connect your wallet first!');
      return;
    }
    const provider = new Web3Provider(window.ethereum);
    const contract = new Contract(tokenAddress, [
      "function balanceOf(address) view returns (uint256)"
    ], provider);
    const balance = await contract.balanceOf(walletAddress);
    setTokens([...tokens, { address: tokenAddress, balance: utils.formatUnits(balance, 18) }]);
    setSelectedTokenId(tokenAddress); // Optionally set the selected token
  };

  return (
    <div>
      <input 
        value={tokenAddress} 
        onChange={(e) => setTokenAddress(e.target.value)} 
        placeholder="Token Address" 
      />
      <button onClick={addToken}>Add Token</button>
      <ul>
        {tokens.map((token, index) => (
          <li key={index}>{token.address}: {token.balance}</li>
        ))}
      </ul>
    </div>
  );
}

export default WatchList;
