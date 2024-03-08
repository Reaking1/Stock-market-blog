import React, { useEffect, useState } from 'react';
import { ApiService } from '../api/apiService';
import { useParams } from 'react-router-dom';

interface MarketStatus {
  region: string;
  market_type: string;
  primary_exchanges: string;
  local_close: string;
  local_open: string;
  current_status: string;
  notes: string;
}

const StockPage: React.FC = () => {
  const { symbol } = useParams<{ symbol?: string }>();
  const [marketStatus, setMarketStatus] = useState<MarketStatus[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchMarketStatus = async () => {
      try {
        setLoading(true);
        const marketData = await ApiService.fetchMarketStatus();
        setMarketStatus(marketData);
        console.log(marketData);
      } catch (error) {
        setError('Error fetching market status');
      } finally {
        setLoading(false);
      }
    };

    fetchMarketStatus();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Market Status</h1>
      <p>Symbol: {symbol}</p>
      <ul>
        {marketStatus.map((status, index) => (
          <li key={index}>
            {status.region}: {status.current_status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockPage;
