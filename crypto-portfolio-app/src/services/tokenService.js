import { JsonRpcProvider, formatUnits, Contract } from 'ethers';

const provider = new JsonRpcProvider();

// Your Covalent API key
const COVALENT_API_KEY = 'your-covalent-api-key';

export const getTokenBalance = async (tokenAddress, walletAddress) => {
    const abi = [
        "function balanceOf(address owner) view returns (uint256)"
    ];
    
    const contract = new Contract(tokenAddress, abi, provider);
    const balance = await contract.balanceOf(walletAddress);
    return formatUnits(balance, 18);
};

export const getTokenAllowance = async (tokenAddress, owner, spender) => {
    const abi = [
        "function allowance(address owner, address spender) view returns (uint256)"
    ];

    const contract = new Contract(tokenAddress, abi, provider);
    const allowance = await contract.allowance(owner, spender);
    return formatUnits(allowance, 18);
};

export const transferTokens = async (tokenAddress, to, amount, signer) => {
    const abi = [
        "function transfer(address to, uint amount) returns (bool)"
    ];

    const contract = new Contract(tokenAddress, abi, signer);
    const tx = await contract.transfer(to, amount);
    await tx.wait();
    return tx;
};

export const getHistoricalBalances = async (tokenAddress, walletAddress, dates) => {
    const balances = [];

    for (const date of dates) {
        const timestamp = new Date(date).getTime() / 1000;

        const url = `https://api.covalenthq.com/v1/1/address/${walletAddress}/balances_v2/?quote-currency=USD&format=JSON&nft=false&no-nft-fetch=false&start-date=${date}&end-date=${date}&key=${COVALENT_API_KEY}`;
        
        const response = await fetch(url);
        const data = await response.json();

        const tokenData = data.data.items.find(
            (item) => item.contract_address.toLowerCase() === tokenAddress.toLowerCase()
        );

        const balance = tokenData ? formatUnits(tokenData.balance, tokenData.contract_decimals) : "0";
        balances.push({ date, balance });
    }

    return balances;
};
