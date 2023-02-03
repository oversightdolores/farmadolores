import {useNavigation} from '@react-navigation/native';
import React,{useContext,useEffect,useRef,useState} from 'react';
import {
  DrawerLayoutAndroid,Pressable,
  StyleSheet,Text,
  View
} from 'react-native';
import {
  Avatar,Caption,Title
} from 'react-native-paper';

import authContext from '../components/context/AutContext';

import {Icon} from '@rneui/themed';
import imgDefault from '../assets/user.png';
import PerfilDrawer from '../components/PerfilDrawer';

const Perfil = () => {
  const {user, logout} = useContext(authContext)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigation = useNavigation();
  const drawer = useRef(null);

  const openDrawer = () => {
    drawer.current.openDrawer();
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    drawer.current.closeDrawer();
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <View
          style={{marginLeft: 10, flexDirection: 'row', alignItems: 'center'}}>
          <Avatar.Image
            source={user.photoURL ? { uri: user.photoURL  }: imgDefault}
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
          onPress={() => (isDrawerOpen ? closeDrawer() : openDrawer())}>
          <Icon name="menu" size={30} color="#000" />
        </Pressable>
      ),
    });
  }, [navigation,isDrawerOpen]);

  return (
    <View style={styles.container}>
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition={'right'}
        onDrawerClose={() => setIsDrawerOpen(false)}
        onDrawerOpen={() => setIsDrawerOpen(true)}
        renderNavigationView={() => <PerfilDrawer closeDrawer={closeDrawer} />}>
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
