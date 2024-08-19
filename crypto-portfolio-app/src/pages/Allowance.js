import React, { useState } from 'react';
import { ethers } from 'ethers';

const Allowance = () => {
    const [ownerAddress, setOwnerAddress] = useState('');
    const [spenderAddress, setSpenderAddress] = useState('');
    const [tokenAddress, setTokenAddress] = useState('');
    const [allowance, setAllowance] = useState(null);

    const checkAllowance = async () => {
        try {
            // Set up a provider
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            // Set up the ERC-20 contract
            const erc20ABI = [
                // Allowance function
                "function allowance(address owner, address spender) view returns (uint256)"
            ];
            const contract = new ethers.Contract(tokenAddress, erc20ABI, provider);

            // Get the allowance
            const allowance = await contract.allowance(ownerAddress, spenderAddress);

            // Convert the result to a readable format (e.g., ether)
            const allowanceFormatted = ethers.utils.formatUnits(allowance, 18); // Assuming token has 18 decimals
            setAllowance(allowanceFormatted);
        } catch (error) {
            console.error('Error checking allowance:', error);
        }
    };

    return (
        <div>
            <h2>Check Token Allowance</h2>
            <label>
                Owner Address:
                <input 
                    type="text" 
                    value={ownerAddress} 
                    onChange={(e) => setOwnerAddress(e.target.value)} 
                />
            </label>
            <br />
            <label>
                Spender Address:
                <input 
                    type="text" 
                    value={spenderAddress} 
                    onChange={(e) => setSpenderAddress(e.target.value)} 
                />
            </label>
            <br />
            <label>
                Token Contract Address:
                <input 
                    type="text" 
                    value={tokenAddress} 
                    onChange={(e) => setTokenAddress(e.target.value)} 
                />
            </label>
            <br />
            <button onClick={checkAllowance}>Check Allowance</button>

            {allowance !== null && (
                <div>
                    <h3>Allowance:</h3>
                    <p>{allowance} tokens</p>
                </div>
            )}
        </div>
    );
};

export default Allowance;
