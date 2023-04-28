import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useState, useEffect, createContext } from 'react';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { Alert } from 'react-native';



const AuthContext = createContext({
  isLoggedIn: false,
  user: {},
  login: async () => { },
  logout: async () => { },
  register: async () => { },
  loginWithGoogle: async () => { },
  updateInfo: async () => { },
  updateProfileImage: async () => { },
  resetPassword: async () => { }
});




export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  
  useEffect(() => {
  const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      setIsLoading(true);
      try {
        const snapshot = await firestore()
          .collection('users')
          .doc(user.uid)
          .get();
        const data = snapshot.data();
        setUser(data);
        setIsLoggedIn(true);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setUser(null);
      setIsLoading(false);
    }
  });
  return () => unsubscribe();
}, []);





  const resetPassword = async (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(emailRegex)) {
      try {
        await firebase.auth().sendPasswordResetEmail(email);
        Alert.alert("Email de restablecimiento de contraseña enviado");
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert("Por favor ingresa un correo electrónico válido");
    }
  }


  const register = async (email, password, displayName, apellido) => {

    try {
      const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = response.user;
      await firestore().collection('users').doc(user.uid).set({
        uid: user.uid,
        displayName: displayName,
        email: email,
        apellido: apellido,
        photoURL: '',
        dir: '',
        phoneNumber: '0000000'
      });
      return setUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await firebase.auth().signInWithEmailAndPassword(email, password);
      return setUser(response.user);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Este email ya esta en uso!');
      }

      if (error.code === 'auth/invalid-email') {
        Alert.alert('El email ingresado es invalido!');
      }

      if (error.code === 'auth/user-not-found') {
        Alert.alert('El email ingresado no esta registrado!');
      }

      console.error(error.code);
    }
  };

  const loginWithGoogle = async () => {
    await GoogleSignin.signOut()

    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = firebase.auth.GoogleAuthProvider.credential(idToken);
      const { user } = await firebase.auth().signInWithCredential(googleCredential);
      const userRef = firestore().collection('users').doc(user.uid);
      setIsLoading(true)
      const snapshot = await userRef.get();
      if (!snapshot.exists) {
        await userRef.set({
          uid: user?.uid || '',
          email: user?.email,
          displayName: user?.displayName || '',
          apellido: '',
          phoneNumber: user?.phoneNumber || '',
          dir: '',
          photoURL: user?.photoURL || ''
        });
      }
      return setUser(snapshot);

    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await firebase.auth().signOut()
      setUser(null)
      setIsLoggedIn(false)
    } catch (error) {
      console.log(error);
    }
  };


  const updateProfileImage = async (uid, uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const ref = storage().ref(`users/${user.uid}/image`);
      const snapshot = await ref.put(blob);
      const url = await snapshot.ref.getDownloadURL();
      await firestore()
        .collection('users')
        .doc(user.uid)
        .update({ profileImage: url });


    } catch (error) {
      console.log(error);
    }
  };


  const updateInfo = async (userId, userInfo) => {
    try {
      await firestore()
        .collection('users')
        .doc(userId)
        .update({
          uid: userId,
          displayName: userInfo.displayName,
          email: user?.email,
          apellido: userInfo.apellido,
          phoneNumber: userInfo.phoneNumber,
          dir: userInfo.dir
        });
    } catch (error) {
      console.log(error);
    }
  };





  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isLoggedIn,
        updateInfo,
        updateProfileImage,
        loginWithGoogle,
        login,
        register,
        logout,
        resetPassword,

      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;


