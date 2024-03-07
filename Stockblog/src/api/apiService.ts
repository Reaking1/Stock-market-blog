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

interface MarketStatus {
    region: string,
    market_type: string
    primary_exchange: string,
    local_close: string,
    local_open: string,
    current_status: string,
    notes: string

  }

interface StockPageHistoryItem {
    date: string,
    open: number,
    high: number,
    low: number;
    close: number,
    volume: number
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

    fetchStockHistory: async (symbol: string, timeframe: string): Promise<StockPageHistoryItem[]> => {
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
       const res = await axios.get(url);
       const data: StockPageHistoryItem[] = [];
       for (const key in res.data['Time series (Daily)']) {
        if (Object.prototype.hasOwnProperty.call(res.data['Time Series (Daily)'], key)) {
            const item = res.data['Time series (Daily)'][key];
            data.push({
                date: key,
                open: parseFloat(item['1. open']),
                high: parseFloat(item['2. high']),
                low: parseFloat(item['3. low']),
                close: parseFloat(item['4. close']),
                volume: parseFloat(item['5. volume'])
            });
        }
       }

       return data
       

      
    },
     
    fetchExchangeRates: async () => {
         const url = `${BASE_URL}/query?function=LIST&keywords=global news&apikey=${API_KEY}`;
         const res = await axios.get(url);
         return res.data
    },

    fetchMarketStatus: async (): Promise<MarketStatus[]> => {
        try {
          const url = `${BASE_URL}/query?function=MARKET_STATUS&apikey=${API_KEY}`;
          const res = await axios.get(url);
          const marketData: MarketStatus[] = [];
    
         for(const marketType in res.data['market_status']) {
            if(Object.prototype.hasOwnProperty.call(res.data['market_status'], marketType)) {
                const marketStatus = res.data['market_status'][marketType];
                marketData.push({
                    market_type: marketType,
                    region: marketStatus['Region'],
                    primary_exchange: marketStatus['Primary Exchanges'],
                    local_close: marketStatus['Local Close'],
                    local_open: marketStatus['Local Open'],
                    current_status: marketStatus['Current Status'],
                    notes: marketStatus['Notes']
                })
            }
         }
          return marketData;
        } catch (error) {
          throw new Error(`Error fetching market status: ${error}`);
        }
      },

 
};