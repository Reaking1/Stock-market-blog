import { useEffect, useState } from "react"
import { ApiService } from "../api/apiService";

interface NewsItem {
    title: string;
    url: string;
    summary: string;
    bannerImage: string;
    source: string;
    timePublished: string;
    
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
                setNews(newsData);
            } catch (error) {
                setError('Error fetching global news');
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    return { news, loading, error };
}
