import { Reducer, ActionCreator } from 'redux';

enum AuthActionTypes {
  LOGOUT = 'auth/LOGOUT',
  LOGIN = 'auth/LOGIN',
}

const initialState: AuthReducerState = {
  token: null,
  userId: null,
};

type LogoutAction = {
  type: AuthActionTypes.LOGOUT;
};

export const logout: ActionCreator<LogoutAction> = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  return ({
  type: AuthActionTypes.LOGOUT,
})};

type LoginAction = {
  type: AuthActionTypes.LOGIN;
  loginData: AuthReducerState;
};

export const login: ActionCreator<LoginAction> = (
  loginData: AuthReducerState
) => ({
  type: AuthActionTypes.LOGIN,
  loginData,
});

type TooltopsActions = LogoutAction | LoginAction;

export const authReducer: Reducer<AuthReducerState, TooltopsActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
      };
    case AuthActionTypes.LOGIN:
      return {
        ...state,
        token: action.loginData.token,
        userId: action.loginData.userId,
      };
    default:
      return state;
  }
};
