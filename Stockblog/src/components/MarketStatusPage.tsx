// In your MarketStatusPage.tsx component

import React from 'react';
import StockPage from './StockPage';

const MarketStatusPage: React.FC = () => {
  return (
    <div>
      <h1>Market Status Page</h1>
      <StockPage /> {/* Display the Market Status component here */}
    </div>
  );
};

export default MarketStatusPage;
