import rootReducer from "./reducer";
import { configureStore } from '@reduxjs/toolkit'

import thunkMiddleware from 'redux-thunk'



export const store = configureStore({
  reducer : rootReducer,
  devTools: true,
  middleware: [thunkMiddleware]
  
})




// thunk nos permite trabajar con asincronismo en el front

export default store;
