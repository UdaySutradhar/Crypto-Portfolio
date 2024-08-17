import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const HistoricalBalance = ({ fetchHistoricalBalance, tokenAddress, walletAddress }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [balance, setBalance] = useState(null);

  const handleDateChange = async (date) => {
    setStartDate(date);
    const balance = await fetchHistoricalBalance(walletAddress, tokenAddress, date);
    setBalance(balance);
  };

  return (
    <div>
      <DatePicker selected={startDate} onChange={(date) => handleDateChange(date)} />
      {balance !== null && <p>Balance on {startDate.toDateString()}: {balance}</p>}
    </div>
  );
};

export default HistoricalBalance;
