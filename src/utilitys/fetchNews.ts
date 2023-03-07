import axios from 'axios';
import { Article } from '../types/Article';

export const getNews = async (): Promise<Article[]> => {
  try {
    const response = await axios.get('https://inshortsapi.vercel.app/news?category=all');
    const news = response.data;

    return news.data;
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to fetch news:`);
  }
};
