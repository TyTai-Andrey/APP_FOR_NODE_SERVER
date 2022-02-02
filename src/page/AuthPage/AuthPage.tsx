import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import { login } from '../../redux/reduxCollection/auth';

import './AuthPage.scss';

export const AuthPage = () => {
  const dispatch = useDispatch();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: '',
    password: '',
    role: 'user',
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    clearError();
  };

  const changeRoleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      role: prev.role === 'user' ? 'admin' : 'user',
    }));
    clearError();
  };

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });
      if (data.message) loginHandler();
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data: AuthReducerState = await request('/api/auth/login', 'POST', {
        ...form,
      });
      dispatch(login(data));
      localStorage.setItem('token', data.token as string);
      localStorage.setItem('userId', data.userId as string);
    } catch (e) {}
  };

  return (
    <div className="AuthPage">
      <div className="AuthPage-modal">
        <div className="AuthPage-modal-title">Регистрация</div>
        <div className="AuthPage-modal-body">
          <div className="AuthPage-modal-body-field">
            <label htmlFor="email">Email:</label>
            <input
              className="AuthPage-modal-body-field field--email"
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={changeHandler}
            />
          </div>
          <div className="AuthPage-modal-body-field">
            <label htmlFor="password">Password:</label>
            <input
              className="AuthPage-modal-body-field field--password"
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={changeHandler}
            />
          </div>
          <div className="AuthPage-modal-body-field">
            <label htmlFor="role">
              Is Admin:
              <input
                className="AuthPage-modal-body-field field--role"
                id="role"
                type="checkbox"
                name="role"
                checked={form.role === 'admin'}
                onChange={changeRoleHandler}
              />
            </label>
          </div>
          <div className="AuthPage-modal-body-error">{error}</div>
        </div>
        <div className="AuthPage-modal-footer">
          <button
            className="AuthPage-modal-footer-button button--auth"
            disabled={loading}
            onClick={registerHandler}
          >
            Зарегистрироваться
          </button>
          <button
            className="AuthPage-modal-footer-button button--login"
            disabled={loading}
            onClick={loginHandler}
          >
            Войти
          </button>
        </div>
      </div>
    </div>
  );
};
