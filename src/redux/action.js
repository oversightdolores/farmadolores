//import {getFirestore, collection, query, where, doc, getDocs, onSnapshot, QuerySnapshot} from 'firebase/firestore'
import firestore from '@react-native-firebase/firestore';
import {auth} from '../components/firebaseConfig';
import {getFarm, loading, getPubli, getEmer, getData} from './reducer';

export const getFarmacias = () => async dispatch => {
  const farma = firestore().collection('farmacias');

  farma.onSnapshot(querySnapshot => {
    querySnapshot?.forEach(doc => {
      dispatch(getFarm(doc.data()));
    });

    dispatch(loading(false));
  });
};

export const getUser = () => async dispatch => {
  const user = auth().currentUser;
  dispatch(getData(user));
};

export const getPublicity = () => async dispatch => {
  const publi = firestore().collection('publi');

  publi?.onSnapshot(querySnapshot => {
    querySnapshot?.forEach(doc => {
      dispatch(getPubli(doc.data()));
    });

    dispatch(loading(false));
  });
};

export const getEmergencias = () => async dispatch => {
  const emer = firestore().collection('emergencias');

  emer.onSnapshot(querySnapshot => {
    querySnapshot?.forEach(doc => {
      dispatch(getEmer(doc.data()));
    });

    dispatch(loading(false));
  });
};
