import React, { useEffect, useState } from 'react'
import { ApiService } from '../api/apiService';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';

interface StockPage {
    name: string,
    price: number,
}


const StockPage: React.FC = () => {
    const { symbol } = useParams<{ symbol?: string }>();
  
 const [stockData, setStockData] = useState<StockPage | null>(null);
 const [stockHistory, setStockHistory] = useState<number[]>([])
  const data = {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [
        {
            label: 'Stock Price',
            data: stockHistory,
            fill: false,
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgba(75, 192, 192, 0.2)',
        }
    ]
  }

   useEffect(() => {
    if(symbol) {
    const fetchData = async () => {
        const data = await ApiService.fetchStockData(symbol);
        setStockData(data)
    };
    fetchData()
}
   }, [symbol])


   useEffect(() => {
    if (symbol) {
        const fetchHistroy = async () => {
            const histroy = await ApiService.fetchStockHistory(symbol);
            setStockHistory(histroy);
        };

        fetchHistroy()
    }
},
[symbol])

    return (
        <div>
            <h1>Stock Page</h1>
            <p>Symbol: {symbol}</p>
            {/** Fetch data from the stock market for a specific symbol */}
            {stockData && (
                <div>
                    <p>Name: {stockData.name}</p>
                    <p>Price: {stockData.price}</p>
                </div>
            )}
            {stockHistory.length > 0 && (
                 <div className="stock">
                    <Line data={data} />
                 </div>
            )}
            
        </div>
    )
}

export default StockPage