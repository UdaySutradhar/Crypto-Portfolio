import axios from 'axios';

const API_KEY = 'fb000854003022380d4183e2c1d64c490469de2ffede2fba8ce7beee618e3f36';

export const fetchHistoricalData = async (tokenAddress, date) => {
  const response = await axios.get(`https://min-api.cryptocompare.com/data/pricehistorical`, {
    params: {
      fsym: tokenAddress,
      tsyms: 'USD',
      ts: date.getTime() / 1000,
      api_key: API_KEY
    }
  });
  return response.data;
};
