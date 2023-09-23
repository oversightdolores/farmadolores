// storage.js

import AsyncStorage from '@react-native-async-storage/async-storage';

// Obtener los datos de farmacias desde AsyncStorage
export const getFarmaciasFromStorage = async () => {
    try {
        const farmaciasData = await AsyncStorage.getItem('farmaciasData');
        if (farmaciasData !== null) {
            return JSON.parse(farmaciasData);
        }
    } catch (error) {
        console.error('Error al recuperar datos de farmacias desde AsyncStorage', error);
    }
    return null;
};

// Obtener los datos de publicidad desde AsyncStorage
export const getPublicidadFromStorage = async () => {
    try {
        const publiData = await AsyncStorage.getItem('publiData');
        if (publiData !== null) {
            return JSON.parse(publiData);
        }
    } catch (error) {
        console.error('Error al recuperar datos de publicidad desde AsyncStorage', error);
    }
    return null;
};


export const getEmergenciaFromStorage = async () => {
    try {
        const emerData = await AsyncStorage.getItem('emerData');
        if (emerData !== null) {
            return JSON.parse(emerData);
        }
    } catch (error) {
        console.error('Error al recuperar datos de publicidad desde AsyncStorage', error);
    }
    return null;
}
// Repite este patrón para otras acciones si es necesario
