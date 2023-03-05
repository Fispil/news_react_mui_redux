import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Blog } from './pages/BlogPage';
import { AboutPage } from './pages/AboutPage';
import { NewsPage } from './pages/NewsPage';
import { ProfilePage } from './pages/ProfilePage';
import { SignIn } from './pages/SignInPage';
import { SignUp } from './pages/SignUp';
import { useAppSelector } from './utilitys/hooks';

export const App: React.FC = () => {
  const userIsLogged = useAppSelector((state) => state.user.isLoggined);

  return (
    <Routes>
      <Route path="/about" element={<AboutPage />} />
      <Route path="/news" element={<NewsPage />} />
      {userIsLogged ? (
        <Route path="/profile" element={<ProfilePage />} />
      ) : (
        <Route path="/profile" element={<Navigate to="/" replace />} />
      )}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<Blog />} />
    </Routes>
  );
};
