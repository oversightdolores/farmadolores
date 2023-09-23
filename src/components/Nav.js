import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './Loading';
import authContext from './context/AutContext';
import { PrivateRoute, PublicRoute } from './context/AuthRoutes';
import NetInfo from '@react-native-community/netinfo';
import {
  getEmergenciasFromStorage,
  getFarmaciasFromStorage,
  getPublicidadFromStorage,
  fetchFarmacias, // Usa las acciones asincrónicas originales
  fetchPublicidad, // Usa las acciones asincrónicas originales
  fetchEmergencias, // Usa las acciones asincrónicas originales
} from '../redux/reducer';

export default function Nav() {
  const { isLoading, isLoggedIn } = useContext(authContext);
  const [isConnected, setIsConnected] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {

    if (!isConnected && isLoggedIn) {
     
      // Si hay conexión a Internet, cargar datos desde Firebase
      // Dispatch de las acciones asincrónicas originales
      dispatch(getFarmaciasFromStorage());
      dispatch(getPublicidadFromStorage());
      dispatch(getEmergenciasFromStorage());
    } else if (isLoggedIn) {
      // Si no hay conexión a Internet, borrar datos de Firebase
      // Dispatch de las acciones asincrónicas originales
      dispatch(fetchFarmacias());
      dispatch(fetchPublicidad());
      dispatch(fetchEmergencias());
    } 
     
  }, [isConnected, dispatch]);

  return (
    <>
      {isLoading ? <Loading /> : isLoggedIn ? <PrivateRoute /> : <PublicRoute />}
    </>
  );
}
