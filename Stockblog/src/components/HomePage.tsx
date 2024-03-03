import React from 'react'
import {Link} from 'react-router-dom'
import { useNewData } from '../hooks/useNewsData';
import '../App.css'



const HomePage: React.FC = () => {
  const {news, loading, error} = useNewData()

  if (loading) {
      return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error} </div>
  }

 // Inside HomePage component
return (
    <div>
        <h1>Home Page</h1>
        <h2>Global News</h2>
        <ul>
                {news.map((item, index) => (
                    <li key={index}>
                        <h3>{item.title}</h3>
                        <p>{item.summary}</p>
                        <p>Source: {item.source}</p>
                        <p>Published: {item.timePublished}</p>
                        <img src={item.bannerImage} alt={item.title} />
                        <a href={item.url} target="_blank" rel="noopener noreferrer">Read more</a>
                    </li>
                ))}
            </ul>
        <h2>Stocks</h2>
        //LINKS FOR EACH STOCK
        <ul>
            <li>
                <Link to="/stock/AAPL">Apple (AAPL)</Link>
            </li>
            <li>
                <Link to="/stock/GOOGL">Google (GOOGL)</Link>
            </li>
            <li>
                <Link to="/stock/MSFT">Microsoft (MSFT)</Link>
            </li>
            <li>
                <Link to="/stock/AMZN">Amazon (AMZN)</Link>
            </li>
            <li>
                <Link to="/stock/FB">FaceBook (FB)</Link>
            </li>
            <li>
                <Link to="/stock/TSLA">Tesla(TSLA)</Link>
            </li>
            <li>
                <Link to="/stock/NVDA">NVIDA (NVDA)</Link>
            </li>
            {/* Add more links for other stocks */}
        </ul>
    </div>
);

}

export default HomePage;
