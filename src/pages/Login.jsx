//construccion de login con firebase y google y react native y redux

import {useNavigation} from '@react-navigation/native';
import React,{useContext,useEffect,useState} from 'react';
import {
  Button,Dimensions,Image,Pressable,SafeAreaView,StyleSheet,Text,View
} from 'react-native';
import {Modal,TextInput} from 'react-native-paper';
import {useDispatch,useSelector} from 'react-redux';
import AuthContext from '../components/context/AutContext';
import GoogleLogin from '../components/GoogleLogin';
import {selectUser} from '../redux/reducer';
const { height} = Dimensions.get('window');

export default function Login() {
  const {login, resetPassword} = useContext(AuthContext)
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


  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={require('../assets/logo.png')} />
      </View>
      <View style={styles.footer}>
        <Text style={styles.titl}>Bienvenido</Text>
        <Text style={styles.text}>Inicia sesión con tu cuenta</Text>
        <View style={styles.button}>
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
          <Pressable
            style={styles.btnI}
            
            onPress={()=>login(email, password)}
          >
            <Text style={{fontWeight: 'bold', color:'#009387'}}>Inicias sesion</Text>
            </Pressable>
            <Text style={styles.text}>----- O -----</Text>

        <GoogleLogin />
        </View>

        <View style={styles.button}>
          <Pressable onPress={() => navigation.navigate('Register')}>
            <Text style={{color: 'black'}}>
              ¿No tienes una cuenta? Registrate
            </Text>
          </Pressable>

        </View>
        <View style={styles.contM}>
        <Text style={ styles.textM}>Created By BelaCode</Text>
          </View>
      </View>

      <Modal style={styles.containerM} visible={visible} onDismiss={hideModal}>
  <View style={styles.modal}>
    <Text style={[styles.modalText, styles.titl]}>Restablecer contraseña</Text>
    <TextInput
      style={styles.input}
      label="Email"
      mode="outlined"
      value={resetMail}
      onChangeText={text => setResetMail(text)}
    />
    <Button style={styles.submitBtn} title="Enviar" onPress={() => resetPassword(resetMail)} />
  </View>
</Modal>
    </SafeAreaView>
  );
}


  styles = StyleSheet.create({
    container: {
      flex: 1,
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor: '#009387',
    },
    header: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    footer: {
      justifyContent: 'center',
      alignContent: 'center',
      flex: 3,
      backgroundColor: '#ffff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 20,
      paddingHorizontal: 30,
    },
    logo: {
      width: height * 0.2,

      resizeMode: 'contain',
    },
    titl: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold',
    },
    text: {
      color: '#bdbfc0',
      marginTop: 5,
    },
    contM: {
      marginTop:20, 
      justifyContent: 'center', 
      alignItems: 'center'
    },
    textM: { 
      color: '#bdbfc0',
      marginTop: 20, 
    },
    button: {
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
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
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
