import React, { useEffect, useState } from 'react';
import { getTokenBalance } from '../services/tokenService';

const WatchList = ({ walletAddress }) => {
  const [tokens, setTokens] = useState([]);
  const [balances, setBalances] = useState({});

  useEffect(() => {
    const fetchBalances = async () => {
      if (walletAddress) {
        const balances = await Promise.all(
          tokens.map(async (token) => ({
            symbol: token.symbol,
            balance: await getTokenBalance(token.address, walletAddress),
          }))
        );
        setBalances(balances);
      }
    };

    fetchBalances();
  }, [walletAddress, tokens]);

  const handleAddToken = (e) => {
    e.preventDefault();
    const address = e.target.elements.address.value;
    const symbol = e.target.elements.symbol.value;
    setTokens([...tokens, { address, symbol }]);
  };

  return (
    <div>
      <h2>Watch List</h2>
      <form onSubmit={handleAddToken}>
        <input name="address" placeholder="Token address" required />
        <input name="symbol" placeholder="Token symbol" required />
        <button type="submit">Add Token</button>
      </form>
      <ul>
        {tokens.map((token) => (
          <li key={token.address}>
            {token.symbol}: {balances[token.symbol] || 'Loading...'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WatchList;
