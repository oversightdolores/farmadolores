import moment from 'moment';
import React,{useEffect,useState} from 'react';
import {
  SafeAreaView,StyleSheet,View
} from 'react-native';
import CarouselCards from '../components/CarouselCards';
import Turnos from '../components/Turnos';

import {useNavigation} from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();
  
  const Hora = moment().format('HH:mm:ss');
  const [hs, setHs] = useState('');

  useEffect(() => {
    setHs(Hora);
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  console.log(
    `  *
        b
       b e
      b e n
     b e n i
    b e n i c
   b e n i c i
  b e n i c i o
       | |
   ____| |____
  | 1/12/2022 |
  |   18:30   |`,
  );


  //<StatusBar barStyle="darck-content" backgroundColor="#606060ff" />

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Turnos />
      </View>
      <View style={styles.body}>
        <CarouselCards />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  header: {
    flex: 2,
    backgroundColor: '#fff',
  },
  body: {
    flex: 1,
    marginTop: -50,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
