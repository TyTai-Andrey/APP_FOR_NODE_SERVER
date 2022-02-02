import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import { logout } from '../../redux/reduxCollection/auth';
import getPosts from '../../services/getPosts';

import './Main.scss';

export const Main: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, request, error, clearError } = useHttp();
  const { userId, token } = useSelector((state: AppState) => state.authReducer);

  const [form, setForm] = useState({
    title: '',
    text: '',
  });
  const [activeHeader, setActiveHeader] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);

  const fetchPost = async () => {
    if (token) {
      const posts = await getPosts(token!);
      if (posts) {
        setPosts(posts);
      }
    }
  };

  useEffect(() => {
    fetchPost();
  }, [token]);

  const changeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    clearError();
  };

  const changeTextHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    clearError();
  };

  const createHandler = async () => {
    try {
      const data = await request(
        '/api/post/generate',
        'POST',
        {
          ...form,
          user: { userId },
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (data) {
        const { post } = data;
        setPosts((prev) => [...prev, post]);
        setActiveHeader(false);
      }
    } catch (e) {}
  };

  return (
    <div className="Main">
      <div className={`Main-header${activeHeader ? ' active' : ''}`}>
        <div className="Main-header-body">
          <div className="AuthPage-modal-body-field">
            <label htmlFor="title">Title:</label>
            <input
              className="AuthPage-modal-body-field field--title"
              id="title"
              type="text"
              name="title"
              value={form.title}
              onChange={changeTitleHandler}
            />
          </div>
          <div className="AuthPage-modal-body-field">
            <label htmlFor="text">Text:</label>
            <textarea
              className="AuthPage-modal-body-field field--text"
              id="text"
              name="text"
              value={form.text}
              onChange={changeTextHandler}
            />
          </div>
          <div className="AuthPage-modal-body-error">{error}</div>
          <div>
            <button
              className="AuthPage-modal-footer-button"
              disabled={loading}
              onClick={createHandler}
            >
              Создать пост
            </button>
            <button
              className="AuthPage-modal-footer-button"
              disabled={loading}
              onClick={() => {
                dispatch(logout());
              }}
            >
              Выйти
            </button>
          </div>
        </div>
        <div
          className="Main-header-visible"
          onClick={() => setActiveHeader((prev) => !prev)}
        >
          {`${activeHeader ? 'Закрыть' : 'Открыть'} меню`}
        </div>
      </div>
      <div className="Main-body">
        {posts.map((post: IPost) => (
          <div className="Post" key={post._id}>
            <div className="Post-title">Title: {post.title}</div>
            <div className="Post-text">Text: {post.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
