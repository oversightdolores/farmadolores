import {useNavigation} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import React,{useContext} from 'react';
import {
  Button,Pressable,
  StyleSheet,Text,
  View,
  ScrollView
} from 'react-native';
import {
  Avatar,Title,TouchableRipple
} from 'react-native-paper';
import imgDefault from '../assets/user.png';
import authContext from './context/AutContext';
import ThemeContext from './context/ThemeContext';

const PerfilDrawer = () => {

    const { theme, toggleTheme } = useContext(ThemeContext);
    const {user, logout} = useContext(authContext)
    
    const navigation = useNavigation();

    const onPress = () => {

        navigation.navigate('EditarPerfil', {
          uid: user?.uid,
          displayName: user?.displayName,
          apellido: user?.apellido,
          phoneNumber: user?.phoneNumber,
          dir: user?.dir,
          photoURL: user?.photoURL
        });
      };


      reportProblem = () => {
        navigation.navigate('Reportar');
      };
    

return(
    <ScrollView style={styles.drawerContent}>
      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image
            source={user?.photoURL ? { uri: user?.photoURL  }: imgDefault}
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
          {/* <View
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
          </View> */}
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
    </ScrollView>
  );
}

export default PerfilDrawer


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