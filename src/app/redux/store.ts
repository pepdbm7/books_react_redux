import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import {combineReducers} from "redux";
//reducers:
import listReducer from './listSlice';
import authReducer from './authSlice';
import bookReducer from "./bookSlice"


const reducers = combineReducers({
  auth: authReducer,
  list: listReducer,
  book: bookReducer
 });
 
 const persistConfig = {
     key: 'root',
     storage,
     whitelist:["auth", "books"]
 };

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
