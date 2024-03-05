import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StockPage from "./components/StockPage";
import HomePage from "./components/HomePage";
import NotFoundPage from "./components/NotFoundPage";
import MarketStatusPage from "./components/MarketStatusPage";




const App: React.FC = () => {
  return (
    <Router>
    <Routes>
    <Route path="/" element={<HomePage />} />
        <Route path="/stock/:symbol" element={<StockPage />} />
        <Route path="/market-status" element={<MarketStatusPage />} />
        <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </Router>
  );
};

export default App;
