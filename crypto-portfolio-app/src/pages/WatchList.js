import React, { useState } from 'react';

const WatchList = () => {
    const [tokens, setTokens] = useState([]);
    const [tokenInput, setTokenInput] = useState('');

    const addToken = () => {
        setTokens([...tokens, tokenInput]);
        setTokenInput('');
    };

    return (
        <div>
            <h2>Token Watchlist</h2>
            <input 
                type="text" 
                value={tokenInput} 
                onChange={(e) => setTokenInput(e.target.value)} 
                placeholder="Enter Token Symbol" 
            />
            <button onClick={addToken}>Add Token</button>
            <ul>
                {tokens.map((token, index) => (
                    <li key={index}>{token}</li>
                ))}
            </ul>
        </div>
    );
};

export default WatchList;
