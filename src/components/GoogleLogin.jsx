import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';
import authContext from './context/AutContext'; // Asegúrate de que la importación sea correcta

GoogleSignin.configure({
  scopes: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"],
  androidClientId: '320257863836-qsqd0qh6sghoiso15p5oenq2067ckg4q.apps.googleusercontent.com',
  webClientId: '320257863836-7mq4mav5bst0iuraeahu2lpoinjrtc02.apps.googleusercontent.com',
  forceCodeForRefreshToken: true,
});

export default function GoogleLogin() {
  const { loginWithGoogle } = useContext(authContext);
  const dispatch = useDispatch();
  const [gettingLoginStatus, setGettingLoginStatus] = useState(false); // Inicializa gettingLoginStatus como falso
  const [progress, setProgress] = useState(false); // Inicializa progress como falso

  // Define la función onPress para manejar el inicio de sesión con Google
  const onPress = async () => {
    try {
      // Antes de iniciar sesión, establece gettingLoginStatus y progress como verdadero
      setGettingLoginStatus(true);
      setProgress(true);

      // Llama a la función de inicio de sesión con Google
      await loginWithGoogle();

      // Después del inicio de sesión exitoso, puedes realizar cualquier acción adicional aquí

      // Finalmente, establece gettingLoginStatus y progress como falso
      setGettingLoginStatus(false);
      setProgress(false);
    } catch (error) {
      // Maneja cualquier error que ocurra durante el inicio de sesión
      console.error('Error al iniciar sesión con Google:', error);

      // En caso de error, asegúrate de restablecer gettingLoginStatus y progress a falso
      setGettingLoginStatus(false);
      setProgress(false);
    }
  };

  return (
    <View>
      <GoogleSigninButton
        style={{ width: 250, height: 50 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={onPress}
        disabled={gettingLoginStatus}
        progress={progress}
      />
    </View>
  );
}
