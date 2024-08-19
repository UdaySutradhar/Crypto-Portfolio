import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Button, TextField, Typography, List, ListItem } from '@mui/material';

function WatchList() {
    const [tokenAddress, setTokenAddress] = useState("");
    const [watchList, setWatchList] = useState([]);

    function addTokenToWatchList() {
        setWatchList([...watchList, tokenAddress]);
        setTokenAddress("");
    }

    return (
        <div>
            <Typography variant="h6">Token Watch List</Typography>
            <TextField
                label="Token Address"
                variant="outlined"
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={addTokenToWatchList}>
                Add Token
            </Button>
            <List>
                {watchList.map((token, index) => (
                    <ListItem key={index}>{token}</ListItem>
                ))}
            </List>
        </div>
    );
}

export default WatchList;
