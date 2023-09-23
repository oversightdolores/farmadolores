import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import AuthContext from '../components/context/AutContext';
import GoogleLogin from '../components/GoogleLogin';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'

export default function Register() {
  const { register, loading } = useContext(AuthContext);
  const navigation = useNavigation();
  const [displayName, setDisplayName] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    name: false,
    apellido: false,
    email: false,
    password: false,
  });

  const validate = () => {
    const emailError = !email || !email.includes('@');
    const passwordError = !password;
    const nameError = !displayName;
    const apellidoError = !apellido;

    setErrors({
      email: emailError,
      password: passwordError,
      apellido: apellidoError,
      name: nameError,
    });

    return !emailError && !passwordError && !nameError && !apellidoError;
  };

  const handleRegister = () => {
    if (validate()) {
      register(email, password, displayName, apellido);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.form}>
        <Text style={styles.title}>Regístrate</Text>
        <Text style={styles.subtitle}>Ingresa tus datos para continuar</Text>
        <TextInput
          mode="outlined"
          label="Nombre"
          error={errors.name}
          style={styles.input}
          autoCapitalize="none"
          onChangeText={(text) => setDisplayName(text)}
        />
        <TextInput
          mode="outlined"
          label="Apellido"
          error={errors.apellido}
          style={styles.input}
          autoCapitalize="none"
          onChangeText={(text) => setApellido(text)}
        />
        <TextInput
          mode="outlined"
          label="Correo electrónico"
          error={errors.email}
          style={styles.input}
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          mode="outlined"
          label="Contraseña"
          error={errors.password}
          secureTextEntry
          style={styles.input}
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
        />
        <HelperText type="error" visible={errors.email || errors.password || errors.name || errors.apellido}>
          Por favor, completa los campos correctamente.
        </HelperText>
        <Button
          mode="contained"
          style={styles.registerButton}
          onPress={handleRegister}
        >
          Registrarse
        </Button>
        <Text style={styles.orText}>o</Text>
      </View>
      <View style={styles.footerContainer}>
        <GoogleLogin />
       
        <Text style={styles.footerText}>© 2023 BelaCode</Text>
      </View>
        <Pressable onPress={() => navigation.goBack()} style={styles.goBackTextContainer}>
          <Icon name="arrow-back" size={30} color="#009387" />
        </Pressable>
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
  header: {
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
  form: {
   
    marginTop: 20,
  
  },
  footerContainer: {
    alignItems: 'center',
    marginTop: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
  },
  registerButton: {
    backgroundColor: '#009387',
    marginTop: 5,
  },
  orText: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#009387',
    fontSize: 20,
  },
  goBackTextContainer: {
   position: 'absolute',
   top: 20,
   left: 20,
   zIndex: 1,
  
  },
  goBackText: {
    color: '#009387',
    fontWeight: 'bold',
    fontSize: 26,
  },
});
