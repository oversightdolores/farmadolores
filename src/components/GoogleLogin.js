import {
  GoogleSignin,GoogleSigninButton
} from '@react-native-google-signin/google-signin';
import React,{useContext,useState} from 'react';
import {View} from 'react-native';
import {useDispatch,useSelector} from 'react-redux';
import {selectUser} from '../redux/reducer';

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

 
  return (
    <View>
      <GoogleSigninButton
        style={{width: 250, height: 50}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={loginWithGoogle}
        disabled={gettingLoginStatus}
        progress={progress}
      />
    </View>
  );
}
