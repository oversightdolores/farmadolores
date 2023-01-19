
import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Alert,
  Pressable,
  Dimensions,
} from 'react-native';
import {useDispatch} from 'react-redux';
import AuthContext from '../components/context/AutContext';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-paper';
import GoogleLogin from '../components/GoogleLogin';

const { height} = Dimensions.get('window');
export default function Register() {
  const {register} = useContext(AuthContext)
  const [displayName, setDisplayName] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}></Image>
      </View>
      <View style={styles.footer}>
        <Text style={styles.title}>Registrate</Text>
        <Text style={styles.text}>Ingresa tus datos para continuar</Text>
        <View style={styles.action}>
          <TextInput
            mode="outlined"
            label="Nombre"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={displayName => setDisplayName(displayName)}
          />
        </View>
        <View style={styles.action}>
          <TextInput
            mode="outlined"
            label="Apellido"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={apellido => setApellido(apellido)}
          />
        </View>
        <View style={styles.action}>
          <TextInput
            mode="outlined"
            label="Correo"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={email => setEmail(email)}
          />
        </View>
        <View style={styles.action}>
          <TextInput
            mode="outlined"
            label="Contraseña"
            secureTextEntry={true}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={password => setPassword(password)}
          />
        </View>
        <View style={styles.button}>
          <Pressable
            style={styles.btnI}
            
            onPress={()=>login(email, password)}
          >
            <Text style={{fontWeight: 'bold', color:'#009387'}}>Registrarse</Text>
            </Pressable>
            <Text style={styles.text}>----- O -----</Text>

        <GoogleLogin />
        </View>

        <View style={styles.button}>
          <Pressable onPress={() => navigation.goBack()}>
            <Text style={styles.text}>volver</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

if (height < 700) {
  styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#009387',
    },
    header: {
      flex: 1,

      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingBottom: 10,
    },
    footer: {
      flex: 3,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,

      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    logo: {
      width: 120,
      height: 120,
    },
    title: {
      color: '#05375a',
      fontSize: 20,
      fontWeight: 'bold',
    },
    text: {
      color: '#bdbfc0',
      marginTop: 5,
      fontSize: 20,
      fontWeight: ' bold'
    },
    button: {
      alignItems: 'center',
      marginTop: 5,
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
    textSign: {
      color: 'grey',
      fontWeight: 'bold',
    },
    action: {
      flexDirection: 'row',
      marginTop: 5,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5,
    },
    textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
    },
  });
} else {
  styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#009387',
    },
    header: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    footer: {
      flex: 2,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30,
    },
    logo: {
      width: 200,
      height: 200,
    },
    title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold',
    },
    text: {
      color: 'grey',

      marginTop: 5,
    },
    button: {
      alignItems: 'center',
      marginTop: 5,
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
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,

      paddingLeft: 10,
      color: '#05375a',
    },

    textSign: {
      color: 'grey',
      fontWeight: 'bold',
    },
  });
}
/*
        *
        b
       b e
      b e n
     b e n i
    b e n i c
   b e n i c i
  b e n i c i o
       | |
   ____| |____



*/
