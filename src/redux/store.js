import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import thunkMiddleware from 'redux-thunk';

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production', // Habilita las DevTools de Redux en desarrollo
  middleware: [thunkMiddleware],
});

export default store;
