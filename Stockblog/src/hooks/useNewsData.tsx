import { useEffect, useState } from "react"
import { ApiService } from "../api/apiService";

interface NewsItem {
    title: string,
    description: string,
    
}


export const useNewData = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const newsData = await ApiService.fetchGlobalNews();
                // Check if the data is not an array 
                if (!Array.isArray(newsData)) {
                    throw new Error('Invalid news data format');
                }
                // Check if each item in the array has the expected properties
                if(newsData.some((item: { title: string; description: string; }) => !item.title || !item.description)) {
                    throw new Error('Invalid news item format');
                } 

                setNews(newsData);
            } catch (error) {
                setError('Error fetching global news');
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    return { error, loading, news };
}
