import React, { useState } from 'react';

const AddTokenForm = ({ addToken }) => {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addToken({ name, symbol, address, balance: 0 });
    setName("");
    setSymbol("");
    setAddress("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Token Name" required />
      <input type="text" value={symbol} onChange={(e) => setSymbol(e.target.value)} placeholder="Symbol" required />
      <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Token Address" required />
      <button type="submit">Add Token</button>
    </form>
  );
};

export default AddTokenForm;
