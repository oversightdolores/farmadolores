import moment from 'moment';
import React,{useEffect,useState} from 'react';
import {
  SafeAreaView,ScrollView,StyleSheet,View
} from 'react-native';
import CarouselCards from '../components/CarouselCards';
import Turnos from '../components/Turnos';
import LinearGradient from 'react-native-linear-gradient';
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
    <SafeAreaView  style={styles.container}>
      <LinearGradient
      colors={['#009387', '#2bac83ff', '#fff']}
      style={styles.linearGradient}
      >
      <View style={styles.header}>
        <Turnos />
      </View>
        <ScrollView>
      <View style={styles.body}>
        <CarouselCards />
      </View>
      </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  linearGradient: {
    flex: 1,
   
  },
  header: {
    flex: 2,
  },
  body: {
    flex: 1,
    
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
