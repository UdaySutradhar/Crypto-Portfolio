import React from 'react';
import { JsonRpcProvider } from 'ethers';

const Header = () => {
    const connectWallet = async () => {
        const provider = new JsonRpcProvider();
        const signer = provider.getSigner();
        console.log('Connected with signer:', signer);
    };

    return (
        <header>
            <h1>Crypto Portfolio</h1>
            <button onClick={connectWallet}>Connect Wallet</button>
        </header>
    );
};

export default Header;
