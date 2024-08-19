import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Button, TextField, Typography } from '@mui/material';

function TokenTransfer() {
    const [recipientAddress, setRecipientAddress] = useState("");
    const [amount, setAmount] = useState("");
    const [tokenAddress, setTokenAddress] = useState("");

    async function transferTokens() {
        if (!window.ethereum) return;

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
            tokenAddress,
            [
                "function transfer(address to, uint amount) returns (bool)"
            ],
            signer
        );

        const amountInWei = ethers.utils.parseUnits(amount, 18);
        const tx = await contract.transfer(recipientAddress, amountInWei);
        await tx.wait();
        alert("Transfer successful!");
    }

    return (
        <div>
            <Typography variant="h6">Transfer Tokens</Typography>
            <TextField
                label="Token Address"
                variant="outlined"
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Recipient Address"
                variant="outlined"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Amount"
                variant="outlined"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={transferTokens}>
                Transfer Tokens
            </Button>
        </div>
    );
}

export default TokenTransfer;
