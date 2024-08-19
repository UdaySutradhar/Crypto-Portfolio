import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/allowance">Check Allowance</Link>
        </li>
        <li>
          <Link to="/transfer">Transfer Tokens</Link>
        </li>
        <li>
          <Link to="/historical">Historical Data</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
