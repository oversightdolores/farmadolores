import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState, useContext} from 'react';
import {
  DrawerLayoutAndroid,
  Image,
  Pressable,
  StyleSheet,
  Button,
  Text,
  View,
  useWindowDimensions,
  DrawerContentScrollView,
  TouchableOpacity,
  Switch
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {auth} from '../components/firebaseConfig';
import firestore from '@react-native-firebase/firestore';
import {login, logout, selectUser, getData} from '../redux/reducer';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import authContext from '../components/context/AutContext';
import ThemeContext from '../components/context/ThemeContext';
import {async} from '@firebase/util';
import {Icon} from '@rneui/themed';
import {
  TextInput,
  Avatar,
  Title,
  Caption,
  TouchableRipple,
  
  TouchableHighlight,
} from 'react-native-paper';
import {LOGOUT} from '../redux/constants';
import {getUser} from '../redux/action';

//const result = await launchImageLibrary(options);
const Perfil = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const {user, logout} = useContext(authContext)
  const isDarkTheme = 'true';


console.log('userPerfil',user)

  const {width, height} = useWindowDimensions();

  const dispatch = useDispatch();
  //const user = auth().currentUser;

  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const [photo, setPhoto] = useState('');
  const [loading, setLoading] = useState(false);
  const usuario = useSelector(selectUser);

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <View
          style={{marginLeft: 10, flexDirection: 'row', alignItems: 'center'}}>
          <Avatar.Image
            source={{
              uri: `${user?.photoURL}`,
            }}
            size={40}
          />
          <View style={{marginLeft: 15, flexDirection: 'column'}}>
            <Title style={styles.title}>{user?.displayName}</Title>
            <Caption style={styles.caption}>{user?.email}</Caption>
          </View>
        </View>
      ),

      headerRight: () => (
        <Pressable
          style={{marginRight: 10}}
          onPress={() => {
            drawer.current.openDrawer();
          }}>
          <Icon name="menu" size={30} color="#000" />
        </Pressable>
      ),
    });
  }, [navigation]);

  reportProblem = () => {
    navigation.navigate('Reportar');
  };

 /*  handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        dispatch(logout());
        dispatch(getUser(null));
      })
      .catch(error => {
        console.log(error);
      });
  }; */

  /* const handleUpdate = () => {
    setLoading(true);
    auth()
      .currentUser.updateProfile({
        displayName: name,
        phoneNumber: number,
        photoURL: photo,
      })
      .then(() => {
        setLoading(false);
        alert('Perfil actualizado');
      })
      .catch(error => {
        alert(error);
        setLoading(false);
      });
  }; */

  
  /*
  const usersRef = firestore().collection('users').doc(user?.uid);
   const createDocument = () => {
    if (!usersRef) {
      usersRef.set({
        name: user.displayName,
        number: user.phoneNumber,
        email: user.email,
        photo: user.photoURL,
      });
    }
  }; */

  useEffect(() => {
    if (user) {
      setName(user?.name);
      setNumber(user?.phoneNumber);
      setEmail(user?.email);
      setPhoto(`${user?.photoURL}`);
    }
  }, [user]);


 /*  const handleImagePicker = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 200,
      maxWidth: 200,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response.assets[0].uri;
        setPhoto(`${source}`);
        auth().currentUser.updateProfile({
          photoURL: `${source}`,
        });
        firestore()
          .collection('users')
          .doc(user.uid)
          .update({
            photoURL: `${source}`,
          })

          .then(() => {
            const user = auth().currentUser;
            dispatch(login(user));
          });
      }
    });

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response.assets[0].uri;
        setPhoto(`${source}`);
        auth().currentUser.updateProfile({
          photoURL: `${source}`,
        });
        firestore()
          .collection('users')
          .doc(user.uid)
          .update({
            photoURL: `${source}`,
          })

          .then(() => {
            const user = auth().currentUser;
            dispatch(login(user));
          });
      }
    });
  }; */

  const drawer = useRef(null);
  const [drawerPosition, setDrawerPosition] = useState('right');
  const changeDrawerPosition = () => {
    if (drawerPosition === 'left') {
      setDrawerPosition('right');
    } else {
      setDrawerPosition('left');
    }
  };

  updatePassword = () => {
    auth()
      .currentUser.updatePassword(pass)
      .then(() => {
        alert('Contraseña actualizada');
      })
      .catch(error => {
        alert(error);
      });
  };

  const onPress = () => {
    console.log('pressed');

    navigation.navigate('EditarPerfil', {
      uid: user?.uid,
      displayName: user?.displayName,
      apellido: user?.apellido,
      phoneNumber: user?.phoneNumber,
      dir: user?.dir,
      photoURL: user?.photoURL
    });
  };

  const renderDrawerContent = () => (
    <View style={styles.drawerContent}>
      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image
            source={{
              uri: `${user?.photoURL}`,
            }}
            size={50}
          />
          <View style={{marginLeft: 15, flexDirection: 'column'}}>
            <Title style={styles.title}>{user?.displayName}</Title>
          </View>
        </View>
        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon name="phone" color="#777777" size={20} />
            <Text style={{color: '#777777', marginLeft: 20}}>
              {user?.phoneNumber}

            </Text>
          </View>
        </View>
        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon name="email" color="#777777" size={20} />
            <Text style={{color: '#777777', marginLeft: 20}}>
              {user?.email}
            </Text>
          </View>
        </View>

        <View style={styles.menuWrapper}>
          <TouchableRipple onPress={() => {onPress()}}>
            <View style={styles.menuItem}>
              <Icon
                type="material-community"
                name="account-cog"
                color="#FF6347"
                size={25}
              />
              <Text style={styles.menuItemText}>Editar Perfil</Text>
            </View>
          </TouchableRipple>
          <Pressable onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="lock" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Cambiar Contraseña</Text>
            </View>
          </Pressable>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon
                type="material-community"
                name="account-check"
                color="#FF6347"
                size={25}
              />
              <Text style={styles.menuItemText}>Verificar Cuenta</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple
            onPress={() => {
              navigation.navigate('Reportar', {uid: user.uid});
            }}>
            <View style={styles.menuItem}>
              <Icon
                type="material-community"
                name="account-alert"
                color="#FF6347"
                size={25}
              />
              <Text style={styles.menuItemText}>Reportar Problema</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon
                type="material-community"
                name="message-question"
                color="#FF6347"
                size={25}
              />
              <Text style={styles.menuItemText}>Ayuda</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon
                type="material-community"
                name="account-question"
                color="#FF6347"
                size={25}
              />
              <Text style={styles.menuItemText}>Acerca de</Text>
            </View>
          </TouchableRipple>
        </View>
        <View style={styles.preference}>
          <Text
            style={{
              color: '#777777',
              fontSize: 16,
              fontWeight: 'bold',
              flexDirection: 'column',
            }}>
            Preferencias
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 15,
            }}>
            <Text style={styles.menuItemText}>Modo Oscuro</Text>
            
    <Button title={theme} onPress={toggleTheme} />
  
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 15,
            }}>
            <Text style={styles.menuItemText}>Notificaciones</Text>
            <Switch value={isDarkTheme} onValueChange={() => {}} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 15,
            }}>
            <Text style={styles.menuItemText}>Idioma</Text>
            <Switch value={isDarkTheme} onValueChange={() => {}} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 15,
            }}>
            <Pressable
              onPress={() => {
                logout();
              }}>
              <Text
                style={{
                  color: '#FF6347',
                  fontSize: 16,
                  fontWeight: 'bold',
                  flexDirection: 'column',
                }}>
                Cerrar Sesión
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition={drawerPosition}
        renderNavigationView={renderDrawerContent}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Pressable
                onPress={() => {
                  drawer.current.openDrawer();
                }}>
                <Icon name="menu" color="#FF6347" size={30} />
              </Pressable>
              <Text uperCase style={styles.name}>
                Bienvenido
              </Text>
              <Text uperCase style={styles.userInfo}>
                {user?.displayName}
              </Text>
              <Text style={styles.userInfo}>{user?.email}</Text>
              <Text style={styles.userInfo}>{user?.phoneNumber}</Text>
              
            </View>
          </View>
        </View>
      </DrawerLayoutAndroid>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 10,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },

  preference: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 16,
  },
  menuWrapper: {
    marginTop: 5,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  header: {
    backgroundColor: '#FF6347',
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
    uperCase: true,
  },
  userInfo: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  body: {
    backgroundColor: '#FFFFFF',
    height: 500,
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
  },
  infoContent: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 5,
  },
  iconContent: {
    flex: 1,
    paddingRight: 5,
    alignItems: 'flex-end',
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: '#00BFFF',
  },
});

export default Perfil;
