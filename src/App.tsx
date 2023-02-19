import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { NewsPage } from './pages/NewsPage';
import { ProfilePage } from './pages/ProfilePage';
import { User } from './types/User';

const App = () => {
  const [user, setUser] = useState<User>({
    login: '',
    password: ''
  });
  const [userIsLogged, setUserIsLogged] = useState<boolean>(false);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              user={user}
              onUserChange={setUser}
              userIsLogged={userIsLogged}
              onUserIsLogged={setUserIsLogged}
            />
          }
        />
        <Route
          path="/news"
          element={
            <NewsPage
              user={user}
              onUserChange={setUser}
              userIsLogged={userIsLogged}
              onUserIsLogged={setUserIsLogged}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProfilePage
              user={user}
              onUserChange={setUser}
              userIsLogged={userIsLogged}
              onUserIsLogged={setUserIsLogged}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
