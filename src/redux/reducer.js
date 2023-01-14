
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',

  initialState: {
    user: {},
    farmacias: [],
    publicidad: [],
    emergencias: [],
    loading: true,



  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    getFarm : (state, action) => {
      state.farmacias = [...state.farmacias, action.payload]
    },
    getPubli : (state, action) => {
      state.publicidad = [...state.publicidad, action.payload]
    },
    getEmer : (state, action) => {
      state.emergencias = [...state.emergencias, action.payload]
    },
    loading : (state, action) => {
      state.loading = action.payload
    },
    getData : (state, action) => {
      state.user = action.payload
    }
    
  },



});

export const { login, logout, getFarm, getPubli, getEmer, loading, getData } = userSlice.actions;

export const selectUser = (state) => state.user;
export const selectFarmacias = (state) => state.farmacias;
export const selectPublicidad = (state) => state.publicidad;
export const selectEmergencias = (state) => state.emergencias;
export const selectLoading = (state) => state.loading;


export default userSlice.reducer;



