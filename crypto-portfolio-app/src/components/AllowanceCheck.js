import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Button, TextField, Typography } from '@mui/material';

function AllowanceCheck() {
    const [tokenAddress, setTokenAddress] = useState("");
    const [spenderAddress, setSpenderAddress] = useState("");
    const [allowance, setAllowance] = useState("");

    async function checkAllowance() {
        if (!window.ethereum) return;

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
            tokenAddress,
            [
                "function allowance(address owner, address spender) view returns (uint256)"
            ],
            provider
        );

        const signer = provider.getSigner();
        const ownerAddress = await signer.getAddress();
        const allowanceAmount = await contract.allowance(ownerAddress, spenderAddress);
        setAllowance(ethers.utils.formatUnits(allowanceAmount, 18));
    }

    return (
        <div>
            <Typography variant="h6">Check Token Allowance</Typography>
            <TextField
                label="Token Address"
                variant="outlined"
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Spender Address"
                variant="outlined"
                value={spenderAddress}
                onChange={(e) => setSpenderAddress(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={checkAllowance}>
                Check Allowance
            </Button>
            {allowance && (
                <Typography variant="body1">Allowance: {allowance} tokens</Typography>
            )}
        </div>
    );
}

export default AllowanceCheck;
