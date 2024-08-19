import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Allowance from './pages/Allowance';
import Transfer from './pages/Transfer';
import WatchList from './components/WatchList';
import AllowanceCheck from './components/AllowanceCheck';
import TokenTransfer from './pages/Transfer';
import HistoricalData from './pages/HistoricalData';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/allowance" element={<Allowance />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/historical" element={<HistoricalData />} />
        </Routes>
      </div>
      <WalletConnection />
      <WatchList />
      <AllowanceCheck />
      <TokenTransfer />
    </Router>
  );
}

export default App;
