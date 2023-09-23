import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import {
  Image, ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import AuthContext from '../components/context/AutContext';
import GoogleLogin from '../components/GoogleLogin';

export default function Login() {
  const { login, loading, resetPassword } = useContext(AuthContext);
  const navigation = useNavigation();

  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const validate = () => {
    const emailError = !email || !email.includes('@');
    const passwordError = !password;

    setErrors({
      email: emailError,
      password: passwordError,
    });

    return !emailError && !passwordError;
  };

  const handleLogin = () => {
    if (validate()) {
      login(email, password);
    }
  };

  const handleForgotPassword = () => {
    resetPassword(email);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/logo.png')} />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>¡Bienvenido de nuevo!</Text>
        <Text style={styles.subtitle}>Inicia sesión en tu cuenta</Text>
        <TextInput
          label="Correo electrónico"
          mode="outlined"
          error={errors.email}
          style={styles.input}
          value={email}
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          label="Contraseña"
          mode="outlined"
          error={errors.password}
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <HelperText type="error" visible={errors.email || errors.password}>
          Por favor, completa los campos correctamente.
        </HelperText>
        <Button
          mode="contained"
          style={styles.loginButton}
          onPress={handleLogin}
          loading={loading}
          disabled={loading}
        >
          Iniciar sesión
        </Button>
        <Text style={styles.forgotPassword} onPress={handleForgotPassword}>
          ¿Olvidaste tu contraseña?
        </Text>
      </View>
      <View style={styles.footerContainer}>
        <GoogleLogin />
        <Text style={styles.registerText} onPress={() => navigation.navigate('Register')}>
          ¿No tienes una cuenta? Regístrate
        </Text>
        <Text style={styles.footerText}>© 2023 BelaCode</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
  formContainer: {
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: '#009387',
    marginTop: 10,
  },
  forgotPassword: {
    textAlign: 'center',
    marginTop: 15,
    color: '#009387',
  },
  footerContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  registerText: {
    marginTop: 20,
    color: '#009387',
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: 20,
    color: '#888',
  },
});


 
  /* styles = StyleSheet.create({
    logo: {
      width: 200,
      height: 200,
      margin:1
    },
   container: {
      flex: 1,
      height: '100%',
      width: '100%',
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor: '#009387',
    },
    header: {
      height: '25%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    footer: {
      flex: 2,
      justifyContent: 'center',
      alignContent: 'center',
      height: '70%',
      backgroundColor: '#ffff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
     
      paddingHorizontal: 30,
    },
    titl: {
      color: '#05375a',
      fontSize: 20,
      fontWeight: 'bold',
    },
    text: {
      marginTop: 5,
    },
    contM: {
           

    },
    textM: { 
      color: '#bdbfc0',
      
    },
    button: {
      
      justifyContent: 'center', 
      alignItems: 'center',
      marginTop: 30,
    },
    buttonR: {
      backgroundColor: '#564446',
      justifyContent: 'center', 
      alignItems: 'center',
      marginTop: 30,
    },
    btnI: {
      alignItems: 'center',
      margin: 10,
      width: '67%',
      elevation: 5,
      border: '1px solid',
      borderColor: '000',
      backgroundColor: 'white',
      padding: 10
    }, 
    action: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5,
    },
    textInput: {
      
      width:350,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      backgroundColor: '#ffff',
      color: '#05375a',
    },
    containerM: {
      margin: 10,
       justifyContent: 'center'
     },
     modal: {
     
       backgroundColor: '#fff',
       padding: 20,
       borderRadius: 5,
       width: '100%',
       
     },
     modalText: {
       textAlign: 'center',
       fontSize: 18,
       color: 'gray'
     },
     title: {
       fontWeight: 'bold',
       marginBottom: 20,
     },
     input: {
       width: '100%',
       
       fontSize: 15,
       marginBottom: 20,
       
     },
     submitBtn: {
       backgroundColor: '#4169E1',
       padding: 10,
       borderRadius: 5,
       alignSelf: 'center',
     },
    });
   


 */