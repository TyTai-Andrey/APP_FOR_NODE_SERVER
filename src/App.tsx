import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTE_NAMES } from './constants/routeNames';
import { Main } from './page/Main';
import { WrongPage } from './page/WrongPage';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AuthPage } from './page/AuthPage';
import { useEffect } from 'react';
import { login } from './redux/reduxCollection/auth';

export const App = () => {
  const dispatch = useDispatch();
  const { main, wrongPage } = ROUTE_NAMES;
  const { token } = useSelector((state: AppState) => state.authReducer);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      dispatch(
        login({
          token,
          userId,
        })
      );
    }
  }, []);

  const renderRoutes = () => {
    const isAuthenticated = !!token;
    if (isAuthenticated)
      return (
        <Routes>
          <Route path={main} element={<Main />} />
          <Route path={wrongPage} element={<WrongPage />} />
        </Routes>
      );

    return (
      <Routes>
        <Route path={main} element={<AuthPage />} />
        <Route path={wrongPage} element={<WrongPage />} />
      </Routes>
    );
  };

  return renderRoutes();
};
