type methodTypes = 'GET' | 'POST' | 'DELETE' | 'PUT';

type AuthReducerState = {
  token: null | string;
  userId: null | string;
};

type AppState = {
  authReducer: AuthReducerState;
};
