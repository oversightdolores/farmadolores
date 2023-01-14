import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Image, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import AuthContext  from '../components/context/AutContext';
import { themeContext } from '../components/context/ThemeContext';
import imgDefault from '../assets/user.png'
import { auth } from '../components/firebaseConfig';
import firestore from  '@react-native-firebase/firestore'
//import { updateInfo, updateProfileImage } from '../components/context/AutContext';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {black} from 'react-native-paper/lib/typescript/styles/colors';


function EditarPerfil({route}) {
  //const { user } = useContext(authContext);
  //const {displayName,apellido,tel, dir, photoURL,uid} = route.params
  console.log('este es el usuario de edit context', route.params)
 
  const {user, updateInfo, updateProfileImage} = useContext(AuthContext)
  const [image, setImage] = useState(user?.photoURL);
  const [userInfo, setUserInfo] = useState({
    displayName: user.displayName,
    apellido: user.apellido,
    phoneNumber: user.phoneNumber,
    dir: user.dir
  });
  
  console.log('userInfo', userInfo)


  const handleSaveChanges = async () => {
    try {
      await updateInfo(user.uid, userInfo);
       updateProfileImage(user.uid, image);
      console.log('cambios enviados ')
      setUserInfo({
        displayName: '',
        apellido: '',
        phoneNumber: '',
        dir: ''
      })
      Alert.alert('cambios enviados ')
    } catch (error) {
      console.log(error);
    }
  };

 
    const handleChooseImage = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: true,
            maxHeight: 200,
            maxWidth: 200,
          };
        
          Alert.alert(
            'Seleccionar imagen',
            'Escoge la opción que desees',
            [
              {
                text: 'Galería',
                onPress: async () => {
                  const response = await launchImageLibrary(options);
                  if (response.didCancel) {
                    console.log('User cancelled image picker');
                  } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                  } else {
                    const source = response.assets[0].uri;
                    setImage(source);
                    auth().currentUser.updateProfile({ photoURL: source });
                    firestore()
                      .collection('users')
                      .doc(user.uid)
                      .update({ photoURL: source });
                  }
                },
              },
              {
                text: 'Cámara',
                onPress: async () => {
                  const response = await launchCamera(options);
                  if (response.didCancel) {
                    console.log('User cancelled image picker');
                  } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = response.assets[0].uri;
                setImage(source);
                auth().currentUser.updateProfile({ photoURL: source });
                firestore()
                  .collection('users')
                  .doc(user.uid)
                  .update({ photoURL: source });
            }
        }
        }
    ])
}
    
  

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonImg} title="Elegir imagen" onPress={handleChooseImage} >
      <Image style={styles.image} source={image ? { uri: image  }: imgDefault}  />
      </TouchableOpacity>
      <TextInput style={styles.input}
        placeholder="Nombre"
        placeholderTextColor={'gray'}
        value={userInfo.displayName}
        onChangeText={(text) => setUserInfo({...userInfo, displayName:text})}
      />
      <TextInput style={styles.input}
        placeholder="Apellido"
        placeholderTextColor={'gray'}
        value={userInfo.apellido}
        onChangeText={(text) => setUserInfo({...userInfo, apellido:text})}
      />
      <TextInput style={styles.input}
        keyboardType='number-pad'
        placeholderTextColor={'gray'}
        placeholder="Tel"
        value={userInfo.phoneNumber}
        onChangeText={(text) => setUserInfo({...userInfo, phoneNumber:text})}
      />
      <TextInput style={styles.input}
        placeholder="Dir"
        placeholderTextColor={'gray'}
        value={userInfo.dir}
        onChangeText={(text) => setUserInfo({...userInfo, dir:text})}
      />
      
      <Button style={styles.button} title="Guardar cambios" onPress={handleSaveChanges} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    color: 'black'
  },
  image: {
    width: 200,
    height: 200,
    borderRadius:100,
    marginVertical: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 10,
  },
  buttonImg: {
   
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});



export default EditarPerfil;
