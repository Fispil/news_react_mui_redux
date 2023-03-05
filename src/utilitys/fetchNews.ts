import axios from 'axios';
import { Article } from '../types/Article';

// const API_KEY = process.env.REACT_APP_API_KEY;
const API_KEY = 'f852b7b0b5d442c38351e72ed63c2b41';

export const getNews = async (): Promise<Article[]> => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=apple&from=2023-03-03&to=2023-03-03&sortBy=popularity&apiKey=${API_KEY}`
    );
    return response.data.articles;
  } catch {
    throw new Error('Api call limit exceeded');
  }
};
