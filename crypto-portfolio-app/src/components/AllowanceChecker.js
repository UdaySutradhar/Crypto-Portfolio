import React, { useState } from 'react';
import { getTokenAllowance } from '../services/tokenService';

const AllowanceChecker = ({ tokenAddress, ownerAddress, spenderAddress }) => {
    const [allowance, setAllowance] = useState(null);

    const checkAllowance = async () => {
        const result = await getTokenAllowance(tokenAddress, ownerAddress, spenderAddress);
        setAllowance(result);
    };

    return (
        <div>
            <button onClick={checkAllowance}>Check Allowance</button>
            {allowance && <p>Allowance: {allowance}</p>}
        </div>
    );
};

export default AllowanceChecker;
