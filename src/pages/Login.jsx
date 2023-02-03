//construccion de login con firebase y google y react native y redux

import {useNavigation} from '@react-navigation/native';
import React,{useContext,useEffect,useState} from 'react';
import {
  Button,Image,Pressable,SafeAreaView,StyleSheet,Text,View
} from 'react-native';
import {Modal,TextInput, HelperText} from 'react-native-paper';
import {useDispatch,useSelector} from 'react-redux';
import AuthContext from '../components/context/AutContext';
import GoogleLogin from '../components/GoogleLogin';
import {selectUser} from '../redux/reducer';

export default function Login() {
  const {login, resetPassword} = useContext(AuthContext)
  const errores = () => {
    return !email.includes('@');
  };

  const [email, setEmail] = useState('');
  const [resetMail, setResetMail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: false,
    password: false
  });
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);


  const validate = () => {
    let emailError = false;
    let passwordError = false;
  
    if (!email) {
      emailError = true;
    }
    
    if (!password) {
      passwordError = true;
    }
    
    setErrors({
      email: emailError,
      password: passwordError
    });
    
    return !emailError && !passwordError;
  };
  

  const handleLogin = () => {
    if (validate()) {
      // Realizar la acción de inicio de sesión
      login(email,password)
    }
  };
  
  

  return (
    <>
    <SafeAreaView style={styles.container}>
      <View style={styles.container_header}>
        <Image style={styles.logo} source={require('../assets/logo.png')} />
      </View>
      
      <View style={styles.container_body}>
        <View style={styles.header_body}>
        <Text style={styles.titl}>Bienvenido</Text>
        <Text style={styles.text}>Inicia sesión con tu cuenta</Text>
        </View>
        <View style={styles.center_body}>
        </View>
        <View style={styles.action}>
          <TextInput
            label="Correo"
            mode="outlined"
            error={errors.email}
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
            error={errors.password}
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
        
            </View>


        <View style={styles.container_footer}>
          <Pressable
            style={styles.btnI}
            disabled={errors.email || errors.password}
            onPress={handleLogin}
          >
            <Text style={{fontWeight: 'bold', color:'#009387'}}>Inicias sesion</Text>
            </Pressable>
            <Text style={styles.span}>----- O -----</Text>

        <GoogleLogin />
        
          <Pressable onPress={() => navigation.navigate('Register')}>
            <Text style={{color: 'black', top: 20}}>
              ¿No tienes una cuenta? Registrate
            </Text>
          </Pressable>

          <Text style={ styles.textM}>Created By BelaCode</Text>
        </View>
        
        
    </SafeAreaView>
       

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
</>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  container_header: {
    alignItems: 'center',
    paddingTop: 50,
    height: '25%',
    
    
  },
  logo: {
    width: 150,
    height: 150,
  },
  span: {
    color: 'gray',
    fontSize: 18,
    fontWeight: 'bold'

  },
  /* container_color: {
    flex: 1,
    height: '100%',
    backgroundColor: '#009387'
  }, */
  container_body: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#FFFF'
  },
  header_body: {
    alignItems: 'center',
    marginBottom: 40,
  },
  titl: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    marginTop: 10,
  },
  center_body: {
    flex: 1,
    justifyContent: 'center',
  },
  action: {
    marginTop: 20,
  },
  textInput: {
    fontSize: 16,
  },
  container_footer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#FFFF'
  },
  btnI: {
    alignItems: 'center',
      margin: 10,
      width: '60%',
      elevation: 5,
      borderRadius: 5,
      border: '1px solid',
      borderColor: '000',
      backgroundColor: 'white',
      padding: 10
  },
  textM: {
    fontSize: 14,
    marginTop: 50,
    color: 'gray'
  },
  containerM: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
  },
  submitBtn: {
    padding: 10,
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