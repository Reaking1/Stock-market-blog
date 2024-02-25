import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { ApiService } from '../api/apiService';

interface NewsItem {
    title: string;
    description: string;
}


const HomePage: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
      const fetchNews = async () => {
          try {
              setLoading(true);
              const newwsData = await ApiService.fetchGlobalNews();
              console.log('Fetched news data:', newwsData); // Log the fetched data
              if (!Array.isArray(newwsData) || newwsData.length === 0) {
                  throw new Error('Invalid news data format');
              }
              setNews(newwsData);
          } catch (error) {
              setError('Error fetching global news: '); // Include error message
              console.error('Error fetching news:', error); // Log the error
          } finally {
              setLoading(false);
          }
      };
      fetchNews()
  }, []);

  if (loading) {
      return <div>Loading...</div>;
  }

  return (
      <div>
          <h1>Home Page</h1>
          {error && <div>Error: {error}</div>} {/* Display error message if error state is set */}
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
