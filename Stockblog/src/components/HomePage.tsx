import React from 'react'
import {Link} from 'react-router-dom'
import { useNewData } from '../hooks/useNewsData';




const HomePage: React.FC = () => {
  const {news, loading, error} = useNewData()

  if (loading) {
      return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error} </div>
  }

  return (
      <div>
          <h1>Home Page</h1>
          <h2>Global News</h2>
          <ul>
              {news.map((item, index) => (
                  <li key={index}>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                  </li>
              ))}
          </ul>
          <h2>Stocks</h2>
          <ul>
              <li>
                  <Link to="/stock/AAPL">Apple (AAPL)</Link>
              </li>
              <li>
                  <Link to="/stock/GOOGL">Google (GOOGL)</Link>
              </li>
              {/* Add more links for other stocks */}
          </ul>
      </div>
  );
}

export default HomePage;
