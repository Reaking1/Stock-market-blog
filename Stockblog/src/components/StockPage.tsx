import React from 'react'
import { useParams } from 'react-router-dom'


const StockPage: React.FC = () => {
    const {symbol} = useParams<{ symbol: string}>();

    return (
        <div>
            <h1>Stock Page</h1>
            <p>Symbol: {symbol}</p>
            {/** Fetch data from the stock market for a specific symbol */}
        </div>
    )
}

export default StockPage