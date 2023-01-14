import { firebase, googleAuthProvider } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {useState, useEffect} from 'react'
import { createContext } from 'react';
import {
    GoogleSignin,
    statusCodes,
  } from '@react-native-google-signin/google-signin';

const AuthContext = createContext({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
  register: () => {},
  loginWithGoogle: () => {},
  updateName: () => {},
  updateProfileImage: () => {}
});



export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoading(true)
        setUser(user);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
  }, []);




   const register = async (email, password, displayName) => {
    try {
      const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = response.user;
      await firestore().collection('users').doc(user.uid).set({
        displayName,
        email,
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
      console.log(error);
    }
  };
  
   const loginWithGoogle = async () => {
      await GoogleSignin.signOut()
  
    try {
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = firebase.auth.GoogleAuthProvider.credential(idToken);
      const { user } = await firebase.auth().signInWithCredential(googleCredential);
      const userRef = firestore().collection('users').doc(user.uid);
      const snapshot = await userRef.get();
      if (!snapshot.exists) {
        await userRef.set({
          uid: user?.uid || '',
          displayName: user?.displayName || '',
          apellido: user?.apellido || '',
          tel: user?.tel || '',
          dir: user?.dir || '',
          photoURL: user?.photoURL || ''
        });
      }
      return setUser(user);
  } catch (error) {
      console.log(error);
  }
  };
  
   const logout = async () => {
      try {
          await firebase.auth().signOut()
          setUser(null)
    } catch (error) {
      console.log(error);
    }
  };
  
  
   const updateProfileImage = async (userId, uri) => {
      try {
        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = storage().ref(`users/${userId}/image`);
        const snapshot = await ref.put(blob);
        const url = await snapshot.ref.getDownloadURL();
         const data =await firestore()
          .collection('users')
          .doc(userId)
          .update({ profileImage: url });
          setUser(data.photoURL)
      } catch (error) {
        console.log(error);
      }
    };
  
  
    const updateInfo = async (userId, userInfo) => {
      const {displayName, apellido, tel, dir} = userInfo
      try {
      await firestore()
          .collection('users')
          .doc(userId)
          .update({ 
              uid: userId,
              displayName: displayName,
              email: user?.email,
              apellido: apellido,
              tel: tel,
              dir:dir
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
updateInfo,
updateProfileImage,
loginWithGoogle,
login,
register,
logout,
}}
>
{children}
</AuthContext.Provider>
);
};

export default AuthContext;


/* export const register = async (email, password, displayName) => {
  try {
    const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const user = response.user;
    await firestore().collection('users').doc(user.uid).set({
      displayName,
      email,
    });
    return setUser(user);
  } catch (error) {
    console.log(error);
  }
};

export const login = async (email, password) => {
  try {
    const response = await firebase.auth().signInWithEmailAndPassword(email, password);
    return setUser(response.user);
  } catch (error) {
    console.log(error);
  }
};

export const loginWithGoogle = async () => {
    await GoogleSignin.signOut()

  try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = firebase.auth.GoogleAuthProvider.credential(idToken);
    const { user } = await firebase.auth().signInWithCredential(googleCredential);
    const userRef = firestore().collection('users').doc(user.uid);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
      await userRef.set({
        uid: user?.uid || '',
        displayName: user?.displayName || '',
        apellido: user?.apellido || '',
        tel: user?.tel || '',
        dir: user?.dir || '',
        photoURL: user?.photoURL || ''
      });
    }
    return setUser(user);
} catch (error) {
    console.log(error);
}
};

export const logout = async () => {
    try {
        await firebase.auth().signOut()
        setUser(null)
  } catch (error) {
    console.log(error);
  }
};


export const updateProfileImage = async (userId, uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const ref = storage().ref(`users/${userId}/image`);
      const snapshot = await ref.put(blob);
      const url = await snapshot.ref.getDownloadURL();
       const data =await firestore()
        .collection('users')
        .doc(userId)
        .update({ profileImage: url });
        setUser(data.photoURL)
    } catch (error) {
      console.log(error);
    }
  };


 export const updateInfo = async (userId, userInfo) => {
    const {name, apellido, tel, dir} = userInfo
    try {
    const data = await firestore()
        .collection('users')
        .doc(userId)
        .update({ 
            name: name,
            apellido: apellido,
            tel: tel,
            dir:dir
         });
         setUser(data)
    } catch (error) {
      console.log(error);
    }
  };

 */