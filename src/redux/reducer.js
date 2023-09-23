// actions.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define thunks asincrónicos para obtener datos de farmacias, publicidad y emergencias
export const fetchFarmacias = createAsyncThunk('user/fetchFarmacias', async () => {
  const farma = firestore().collection('farmacias');

  try {
    const querySnapshot = await farma.get();
    const farmaciasData = querySnapshot.docs.map((doc) => doc.data());
    await AsyncStorage.setItem('farmaciasData', JSON.stringify(farmaciasData));
    return farmaciasData;
  } catch (error) {
    console.error('Error al obtener y almacenar datos de farmacias', error);
    throw error;
  }
});

export const fetchPublicidad = createAsyncThunk('user/fetchPublicidad', async () => {
  const publi = firestore().collection('publi');

  try {
    const querySnapshot = await publi.get();
    const publiData = querySnapshot.docs.map((doc) => doc.data());
    await AsyncStorage.setItem('publiData', JSON.stringify(publiData));
    return publiData;
  } catch (error) {
    console.error('Error al obtener y almacenar datos de publicidad', error);
    throw error;
  }
});

export const fetchEmergencias = createAsyncThunk('user/fetchEmergencias', async () => {
  const emer = firestore().collection('emergencias');

  try {
    const querySnapshot = await emer.get();
    const emergenciasData = querySnapshot.docs.map((doc) => doc.data());
    await AsyncStorage.setItem('emerData', JSON.stringify(emergenciasData));
    return emergenciasData;
  } catch (error) {
    console.error('Error al obtener y almacenar datos de emergencias', error);
    throw error;
  }
});

// Función para obtener datos de farmacias desde AsyncStorage y almacenarlos en el slice
export const getFarmaciasFromStorage = () => async (dispatch) => {
  try {
    const farmaciasData = await AsyncStorage.getItem('farmaciasData');

    if (farmaciasData) {
      // Si hay datos en AsyncStorage, conviértelos de JSON a objeto JavaScript
      const farmacias = JSON.parse(farmaciasData);

      // Despacha una acción para almacenar los datos en el slice de Redux
      dispatch(setFarmacias(farmacias));
    }
  } catch (error) {
    console.error('Error al obtener datos de farmacias desde AsyncStorage', error);
  }
};

// Función para obtener datos de publicidad desde AsyncStorage y almacenarlos en el slice
export const getPublicidadFromStorage = () => async (dispatch) => {
  try {
    const publiData = await AsyncStorage.getItem('publiData');

    if (publiData) {
      // Si hay datos en AsyncStorage, conviértelos de JSON a objeto JavaScript
      const publicidad = JSON.parse(publiData);

      // Despacha una acción para almacenar los datos en el slice de Redux
      dispatch(setPublicidad(publicidad));
    }
  } catch (error) {
    console.error('Error al obtener datos de publicidad desde AsyncStorage', error);
  }
};

// Función para obtener datos de emergencias desde AsyncStorage y almacenarlos en el slice
export const getEmergenciasFromStorage = () => async (dispatch) => {
  try {
    const emerData = await AsyncStorage.getItem('emerData');

    if (emerData) {
      // Si hay datos en AsyncStorage, conviértelos de JSON a objeto JavaScript
      const emergencias = JSON.parse(emerData);

      // Despacha una acción para almacenar los datos en el slice de Redux
      dispatch(setEmergencias(emergencias));
    }
  } catch (error) {
    console.error('Error al obtener datos de emergencias desde AsyncStorage', error);
  }
};

// Slice de Redux
const userSlice = createSlice({
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
    setFarmacias: (state, action) => {
      state.farmacias = action.payload;
    },
    setPublicidad: (state, action) => {
      state.publicidad = action.payload;
    },
    setEmergencias: (state, action) => {
      state.emergencias = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUserData: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFarmacias.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFarmacias.fulfilled, (state, action) => {
        state.loading = false;
        state.farmacias = action.payload;
      })
      .addCase(fetchFarmacias.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchPublicidad.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPublicidad.fulfilled, (state, action) => {
        state.loading = false;
        state.publicidad = action.payload;
      })
      .addCase(fetchPublicidad.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchEmergencias.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmergencias.fulfilled, (state, action) => {
        state.loading = false;
        state.emergencias = action.payload;
      })
      .addCase(fetchEmergencias.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { login, logout, setFarmacias, setPublicidad, setEmergencias, setLoading, setUserData } = userSlice.actions;

export default userSlice.reducer;
