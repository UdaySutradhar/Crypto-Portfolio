import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import WatchList from './pages/WatchList';
import History from './pages/History';
import Allowance from './pages/Allowance';
import Transfer from './pages/Transfer';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/watchlist" element={<WatchList />} />
                <Route path="/history" element={<History />} />
                <Route path="/allowance" element={<Allowance />} />
                <Route path="/transfer" element={<Transfer />} />
            </Routes>
        </Router>
    );
}

export default App;
