//construccion de login con firebase y google y react native y redux

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Pressable,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {Modal} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {selectUser, login, logout} from '../redux/reducer';
import {TextInput, Alert, HelperText} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {auth} from '../components/firebaseConfig';
import {Ionicons} from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';
import GoogleLogin from '../components/GoogleLogin';

const {width, height} = Dimensions.get('window');

export default function Login() {
  const errores = () => {
    return !email.includes('@');
  };

  useEffect(() => {
    errores();
  });
  const [email, setEmail] = useState('');
  const [resetMail, setResetMail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);


  

  /* useEffect(() => {}, []);

  const handleLogin = () => {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        const uid = response.user.uid;
        const usersRef = firestore().collection('users');
        usersRef
          .doc(uid)
          .get()
          .then(firestoreDocument => {
            if (!firestoreDocument.exists) {
              alert('User does not exist anymore.');
              return;
            }
            const user = firestoreDocument.data();

            dispatch(login(user));
            setLoading(false);
          })
          .catch(error => {
            alert(error);
            setLoading(false);
          });
      })
      .catch(error => {
        alert(error);
        console.log(error);
        setLoading(false);
      });
  };

  const olvidePassword = () => {
    auth()
      .sendPasswordResetEmail(resetMail)
      .then(
        () => alert('Se envio un correo para restablecer la contraseña'),
        setResetMail(''),
        setVisible(false),
      )

      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  console.log('estado de ususario', auth().currentUser); */

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={require('../assets/logo.png')} />
      </View>
      <View style={styles.footer}>
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.text}>Inicia sesión con tu cuenta</Text>
        <View style={styles.button}>
          <GoogleLogin />
        </View>
        <View style={styles.action}>
          <TextInput
            label="Correo"
            mode="outlined"
            error={errors}
            style={styles.textInput}
            value={email}
            autoCapitalize="none"
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View style={styles.action}>
          <TextInput
            label="Contraseña"
            mode="outlined"
            error={errors}
            secureTextEntry={true}
            style={styles.textInput}
            value={password}
            autoCapitalize="none"
            onChangeText={text => setPassword(text)}
          />
        </View>

        <View style={styles.text}>
          <Pressable onPress={showModal}>
            <Text style={{color: 'black'}}>¿Olvidaste tu contraseña?</Text>
          </Pressable>
        </View>

        <View style={styles.button}>
          <Button
            title="Iniciar Sesión"
            color="#009387"
            onPress={() => handleLogin()}
          />
        </View>
        <View style={styles.button}>
          <Pressable onPress={() => navigation.navigate('Register')}>
            <Text style={{color: 'black'}}>
              ¿No tienes una cuenta? Registrate
            </Text>
          </Pressable>
        </View>
      </View>

      <Modal style={styles.containerM} visible={visible} onDismiss={hideModal}>
        <View style={styles.modal}>
          <Text style={styles.modalText}>Restablecer contraseña </Text>
          <TextInput
            style={styles.input}
            label="Email"
            mode="outlined"
            value={resetMail}
            onChangeText={text => setResetMail(text)}
          />
          <Button title="Enviar" onPress={() => olvidePassword()}></Button>
        </View>
      </Modal>
    </SafeAreaView>
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
    },
    footer: {
      flex: 3,
      backgroundColor: 'white',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 20,
      paddingHorizontal: 30,
    },
    logo: {
      width: height * 0.2,

      resizeMode: 'contain',
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
      marginTop: 15,
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
    containerM: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 100,
    },
    modal: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      width: '100%',
    },
    modalText: {
      fontSize: 18,
      marginBottom: 10,
    },
    input: {
      width: '100%',
      marginBottom: 10,
      padding: 10,
      
      borderColor: 'gray',
      borderRadius: 10,
      color: 'black',
    },
    button: {
      width: '100%',
      backgroundColor: '#0077c9',
      color: 'white',
      padding: 10,
      marginTop: 10,
      textAlign: 'center',
      fontWeight: 'bold',
      borderRadius: 10,
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
      flex: 3,
      backgroundColor: 'white',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30,
    },
    logo: {
      width: height * 0.2,

      resizeMode: 'contain',
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
    modal: {
      backgroundColor: 'white',
      padding: 20,
      margin: 20,
      borderRadius: 10,
      alignItems: 'center',
      shadowColor: '#000',

      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },

    containerM: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    input: {
      width: 200,
      height: 44,
      padding: 10,
      borderWidth: 1,
      borderColor: 'black',
      marginBottom: 10,
    },
  });
}

/* 
const styles = StyleSheet.create({
  container: {
    
    width: width,
    height: height,
    backgroundColor: "#009387",
  },
  header: {
    width: "100%",
    height: height * 0.3,

    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    width: width,
    height:   height * 0.75,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: height * 0.05,
    paddingHorizontal: '3%',
  },
  logo: {
    width: 150,
    height: 150
  },
  title: {
    color: "#05375a",
    fontSize: height * 0.05,
    fontWeight: "bold",
  },
  text: {
    color: "grey",
   
  },
  button: {
    alignItems: "center",
    marginTop: height * 0.02,
  },
  action: {
    flexDirection: "row",
    marginTop: height * 0.02,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: height * 0.01,
  },
  textInput: {
    flex: 1,
    marginTop: height * 0.02,
    paddingLeft: 10,
    color: "#05375a",
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    height: 300,
    width: 350,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    fontSize: 20,
    marginBottom: 15,
    color: "black",
  },
  input: {
    width: 250,
    
   
    borderColor: "black",
    marginBottom: 10,
  },
  containerM: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

});
 */
