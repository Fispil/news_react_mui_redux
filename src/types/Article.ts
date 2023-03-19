export interface Article {
  author: string;
  content: string;
  date: string;
  id: string;
  imageUrl: string;
  time: string;
  title: string;
  url: string;
}

export interface MainPost {
  title: string;
  description: string;
  image: string;
  imageText: string;
  linkText: string;
}

export interface FeaturedPosts {
  title: string;
  date: string;
  description: string;
  image: string;
  imageLabel: string;
}
