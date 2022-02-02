import React from 'react';
import { useNavigate } from 'react-router-dom';

export const WrongPage: React.FC = () => {
  const navigation = useNavigate();

  return (
    <h1
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        userSelect: 'none',
      }}
    >
      404
      <span
        style={{
          textTransform: 'uppercase',
          cursor: 'pointer',
        }}
        onClick={() => navigation('/')}
      >
        back
      </span>
    </h1>
  );
};
