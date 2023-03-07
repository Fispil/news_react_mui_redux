/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Header } from '../components/Header';
import { MainFeaturedPost } from '../components/MainFeaturedPost/MainFeaturedPost';
import { Footer } from '../components/Footer';
import { FeaturedPost } from '../components/FeaturedPost';
import { Main } from '../components/Main/Main';
import Sidebar from '../components/Sidebar/Sidebar';

const mainFeaturedPost = {
  title: 'Title of a longer featured news post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random',
  imageText: 'main image description',
  linkText: 'Continue reading…'
};

const featuredPosts = [
  {
    title: 'News post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text'
  },
  {
    title: 'News Post',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text'
  }
];

const posts = [
  'Introducing our honest and non-bribery news portal - a platform that provides unbiased and objective news coverage on a wide range of topics. We are committed to maintaining the highest standards of journalistic integrity, and we do not accept bribes or engage in any form of corruption. Our news portal is designed to keep you informed about the latest happenings from around the world, with a focus on accuracy, objectivity, and impartiality. We cover a broad range of categories, including politics, business, technology, sports, entertainment, and more, with a commitment to presenting all sides of the story.',
  'The sky was a deep shade of blue, and the sun was just beginning to set over the horizon. As I walked along the beach, I could feel the sand warm beneath my feet. The waves were crashing against the shore, and seagulls were circling overhead. It was a peaceful scene, and I felt content in the moment',
  'The city was bustling with activity, as people hurried to and fro on the sidewalks. Cars honked their horns in the traffic, and street vendors called out their wares. Despite the chaos, there was a sense of energy and excitement in the air. I took a deep breath and smiled, happy to be a part of it all.'
];

const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' }
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon }
  ]
};

export const Blog: React.FC = () => {
  return (
    <React.Fragment>
      <Header />
      <Container component="main" fixed style={{ padding: '80px 0', boxSizing: 'border-box' }}>
        <MainFeaturedPost post={mainFeaturedPost} />
        <Grid container spacing={4}>
          {featuredPosts.map((post) => (
            <FeaturedPost key={post.title} post={post} />
          ))}
        </Grid>
        <Grid container spacing={5} sx={{ mt: 3 }}>
          <Main title="About Us" posts={posts} />
          <Sidebar
            title={sidebar.title}
            description={sidebar.description}
            archives={sidebar.archives}
            social={sidebar.social}
          />
        </Grid>
      </Container>
      <Footer />
    </React.Fragment>
  );
};
