import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <Link to="/">Dashboard</Link>
            <Link to="/watchlist">WatchList</Link>
            <Link to="/history">History</Link>
            <Link to="/allowance">Allowance</Link>
            <Link to="/transfer">Transfer</Link>
        </nav>
    );
}

export default Navbar;
