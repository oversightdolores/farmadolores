import React, {useState, useEffect} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {selectUser, login, logout} from '../redux/reducer';

import {CommonActions} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {auth} from '../components/firebaseConfig';
import {Ionicons} from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';
import {TextInput} from 'react-native-paper';

const {width, height} = Dimensions.get('window');

export default function Register() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          email,
          name,
          lastName,
        };
        const usersRef = firestore().collection('users');
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            auth().currentUser.updateProfile({
              displayName: name,
              lastName: lastName,
            });
            dispatch(login(data));
            setLoading(false);
          })
          .catch(error => {
            alert(error);
            setLoading(false);
          });
      })
      .catch(error => {
        alert(error);
        setLoading(false);
      });
  };

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
            onChangeText={name => setName(name)}
          />
        </View>
        <View style={styles.action}>
          <TextInput
            mode="outlined"
            label="Apellido"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={lastName => setLastName(lastName)}
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
          <Button
            title="Registrarse"
            color="#009387"
            onPress={() => handleLogin()}
          />
        </View>
        <View style={styles.button}>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={styles.textSign}>Iniciar Sesión</Text>
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
      color: 'grey',
      marginTop: 5,
    },
    button: {
      alignItems: 'center',
      marginTop: 20,
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
      marginTop: 50,
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
