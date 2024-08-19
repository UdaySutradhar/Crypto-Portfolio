import React, { useState } from 'react';
import { transferTokens } from '../services/tokenService';

const TokenTransfer = ({ tokenAddress, signer }) => {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');

    const handleTransfer = async () => {
        try {
            const tx = await transferTokens(tokenAddress, recipient, amount, signer);
            alert('Transfer successful: ' + tx.hash);
        } catch (error) {
            console.error(error);
            alert('Transfer failed');
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Recipient Address"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
            />
            <input
                type="text"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handleTransfer}>Transfer Tokens</button>
        </div>
    );
};

export default TokenTransfer;
