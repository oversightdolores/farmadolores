import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { auth } from '../components/firebaseConfig';
import { createSlice } from '@reduxjs/toolkit';

// ...

// Acción para obtener datos de farmacias y almacenarlos en AsyncStorage y en el estado global
export const fetchFarmacias = () => async (dispatch) => {
  const farma = firestore().collection('farmacias');

  farma.onSnapshot((querySnapshot) => {
    const farmaciasData = [];

    querySnapshot.forEach((doc) => {
      farmaciasData.push(doc.data());
    });

    // Almacena los datos en AsyncStorage
    try {
       AsyncStorage.setItem('farmaciasData', JSON.stringify(farmaciasData));
    } catch (error) {
      console.error('Error al almacenar datos de farmacias en AsyncStorage', error);
    }

    // Actualiza el estado global con los datos
    dispatch(setFarmacias(farmaciasData));
    dispatch(setLoading(false));
  });
};

// Acción para obtener datos de publicidad y almacenarlos en AsyncStorage y en el estado global
export const fetchPublicidad = () => async (dispatch) => {
  const publi = firestore().collection('publi');

  publi.onSnapshot((querySnapshot) => {
    const publiData = [];

    querySnapshot.forEach((doc) => {
      publiData.push(doc.data());
    });

    // Almacena los datos en AsyncStorage
    try {
       AsyncStorage.setItem('publiData', JSON.stringify(publiData));
    } catch (error) {
      console.error('Error al almacenar datos de publicidad en AsyncStorage', error);
    }

    // Actualiza el estado global con los datos
    dispatch(setPublicidad(publiData));
    dispatch(setLoading(false));
  });
};

// Acción para obtener datos de emergencias y almacenarlos en AsyncStorage y en el estado global
export const fetchEmergencias = () => async (dispatch) => {
  const emer = firestore().collection('emergencias');

  emer.onSnapshot((querySnapshot) => {
    const emergenciasData = [];

    querySnapshot.forEach((doc) => {
      emergenciasData.push(doc.data());
    });

    // Almacena los datos en AsyncStorage
    try {
       AsyncStorage.setItem('emerData', JSON.stringify(emergenciasData));
    } catch (error) {
      console.error('Error al almacenar datos de emergencias en AsyncStorage', error);
    }

    // Actualiza el estado global con los datos
    dispatch(setEmergencias(emergenciasData));
    dispatch(setLoading(false));
  });
};

// ...
