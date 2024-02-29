import axios from "axios";


const API_KEY = 'IBLCVK3BICIVSYJR';
const BASE_URL = 'https://www.alphavantage.co';

interface NewsItem {
    title: string;
    url: string;
    summary: string;
    bannerImage: string;
    source: string;
    timePublished: string;

}

export const ApiService = {
    fetchStockData: async (symbol: string) => {
        const url = `${BASE_URL}/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`;
        const res = await axios.get(url);
        return res.data
    },

    fetchGlobalNews: async (): Promise<NewsItem[]> => {
        try {
            const url = `${BASE_URL}/query?function=NEWS_SENTIMENT&apikey=${API_KEY}`;
            const res = await axios.get(url);

            //Checking if the res caontains any articles
            if (!res.data ||!res.data.feed) {
                throw new Error('Invaild news data format')
            }
            //Map the articles to the desired structure

            return res.data.feed.map((article: any) => ({
                title: article.title,
                url: article.url,
                summary: article.summary,
                bannerImage: article.banner_image,
                timePublished: article.time_published

            }));
        } catch (error) {
            throw new Error(`Error fetching global news: ${error}`);
        }

    },

    fetchStockDataWeekly: async (symbol: string) => {
        const url = `${BASE_URL}/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=${API_KEY}`;
         const res = await axios.get(url)
         return res.data;
    },

    fetchStockMonthly: async (symbol: string) => {
        const url = `${BASE_URL}/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${API_KEY}`;
        const res = await axios.get(url)
        return res.data
    },

    fetchStockHistory: async (symbol: string, timeframe: string) => {
        let functionName = '';
        switch (timeframe) {
            case 'daily': 
            functionName = 'TIME_SERIES_DAILY';
            break
            case 'weekly': 
            functionName = 'TIME_SERIES_WEEKLY';
            break
            case 'monthly': 
            functionName = 'TIME_SERIES_MONTHLY';
            break
            default:
                throw new Error('Invaild timeframe')
        }
        const url = `${BASE_URL}/query?function=${functionName}&symbol=${symbol}&apikey=${API_KEY}`;
        const res = await axios.get(url)
        return res.data
    },

    fetchExchangeRates: async () => {
         const url = `${BASE_URL}/query?function=LIST&keywords=global news&apikey=${API_KEY}`;
         const res = await axios.get(url);
         return res.data
    }

 
}