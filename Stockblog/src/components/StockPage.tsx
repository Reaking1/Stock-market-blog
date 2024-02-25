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
 const [stockHistory, setStockHistory] = useState<number[]>([]);
 const [loading, setLoading] = useState<boolean>(false);
 const [error, setError] = useState<string>('') 
 

useEffect(() => {
    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await ApiService.fetchStockData(symbol || '');
            setStockData(data);
        } catch (error) {
            setError('Error fetching stock data');
        } finally {
            setLoading(false)
        }
    };

    if(symbol) {
        fetchData();
    }
}, [symbol]);

   useEffect(() =>  {
    const fetchHistory = async () => {
        try {
            setLoading(true);
            const history = await ApiService.fetchStockHistory(symbol || '', 'daily');
            setStockHistory(history);
        } catch (error) {
            setError("Error fetching stock history");
        } finally {
            setLoading(false)
        }
    };

    if (symbol) {
        fetchHistory();
    }

   }, [symbol]);

   if (loading) {
    return <div>Loading...</div>;
   }

   if(error) {
    return <div>Error: {error}</div>
   }
    return (
        <div>
            <h1>Stock Page</h1>
            <p>Symbol: {symbol}</p>
            {stockData && (
                <div>
                    <p>Name : {stockData.name} </p>
                    <p>Price: {stockData.price} </p>
                </div>
            )}
            {stockHistory.length > 0  && (
                <div className='stock'>
                    <Line data={{
                        labels: ['1', '2', '3', '4', '5', '6', '7'],
                        datasets: [
                         { label: 'Stock Price',
                         data: stockHistory,
                         fill: false,
                         backgroundColor: 'rgb(75, 192, 192)',
                         borderColor: 'rgba(75, 192, 192, 0.2)',}
                        ]
                    }}/>
                </div>
            )}
        </div>
        
    )
}

export default StockPage