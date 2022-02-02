import { combineReducers, AnyAction } from 'redux';

import { authReducer } from './reduxCollection/auth';

import { ThunkDispatch } from 'redux-thunk';


export type AppDispatch = ThunkDispatch<AppState, any, AnyAction>;

const rootReducer = combineReducers<AppState>({
  authReducer: authReducer,
});

export { rootReducer };
