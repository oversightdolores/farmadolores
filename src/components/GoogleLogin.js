import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {auth} from './firebaseConfig';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {View, Text, Button} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {login, selectUser} from '../redux/reducer';
import {getUser} from '../redux/action';
import firestore from '@react-native-firebase/firestore';
import {loadOptions} from '@babel/core';

import authContext from './context/AutContext';

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
  webClientId:
    '320257863836-7mq4mav5bst0iuraeahu2lpoinjrtc02.apps.googleusercontent.com',
  androidClientId:
    '320257863836-qsqd0qh6sghoiso15p5oenq2067ckg4q.apps.googleusercontent.com',
  offlineAccess: true,
  accountName: '',
  forceCodeForRefreshToken: true,
  /*  
    iosClientId: '320257863836-qsqd0qh6sghoiso15p5oenq2067ckg4q.apps.googleusercontent.com',
    scopes: ["https://www.googleapis.com/auth/userinfo.profile"], 
    */
});

export default function GoogleLogin() {
  const {loginWithGoogle} = useContext(authContext)
  const dispatch = useDispatch();
  const [gettingLoginStatus, setGettingLoginStatus] = useState();
  const [progress, setProgress] = useState(true);
  const usua = useSelector(selectUser);
  const [user, setUser] = useState('');

  /*  useEffect(() => {
        setGettingLoginStatus(true);
        GoogleSignin.isSignedIn()
        .then((isSignedIn) => {
            if (isSignedIn) {
                GoogleSignin.getCurrentUser()
                .then((user) => {
                    
                    setGettingLoginStatus(false);
                })
                .catch((error) => {
                    console.log(error);
                    setGettingLoginStatus(false);
                });
            } else {
                setGettingLoginStatus(false);
            }
        })
        .catch((error) => {
            console.log(error);
            setGettingLoginStatus(false);
        });
    }, []); */
/* 
  const signIn = async () => {
    try {
      await GoogleSignin.signOut()
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

      const {idToken} = await GoogleSignin.signIn({
        scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
        webClientId:
          '320257863836-7mq4mav5bst0iuraeahu2lpoinjrtc02.apps.googleusercontent.com',
        androidClientId:
          '320257863836-qsqd0qh6sghoiso15p5oenq2067ckg4q.apps.googleusercontent.com',

        forceCodeForRefreshToken: true,
      });
      console.log(idToken);
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
 */
  return (
    <View>
      <GoogleSigninButton
        style={{width: 250, height: 50}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={loginWithGoogle}
        disabled={gettingLoginStatus}
        progress={progress}
      />
    </View>
  );
}
