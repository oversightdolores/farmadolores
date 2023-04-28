import moment from 'moment';
import React,{useContext, useEffect,useState} from 'react';
import {
  SafeAreaView,ScrollView,StyleSheet,View
} from 'react-native';
import CarouselCards from '../components/CarouselCards';
import Turnos from '../components/Turnos';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import { useInterstitialAd, TestIds } from 'react-native-google-mobile-ads';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import BtnHemergency from '../components/BtnHemergency';
import {useSelector} from 'react-redux'; 
import {selectUser} from '../redux/reducer';
import AuthContext from '../components/context/AutContext';

const banner = /* __DEV__ ? TestIds.BANNER : */ 'ca-app-pub-1460570234418559/3397663182';
const interest = /* __DEV__ ? TestIds.BANNER : */ 'ca-app-pub-1460570234418559/1592012526';

export default function Home() {
  const navigation = useNavigation();
  //const user = useSelector(selectUser)
  const {user, logout} = useContext(AuthContext)
  const Hora = moment().format('HH:mm:ss');
  const [hs, setHs] = useState('');
  const { isLoaded, isClosed, load, show } = useInterstitialAd(interest, {
    requestNonPersonalizedAdsOnly: true,
  });



  useEffect(() => {
    // Start loading the interstitial straight away
   
    load();
  }, [load, isLoaded]);

isLoaded ? show() : null
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
  |   18:30   |`
  );



  return (
    <SafeAreaView  style={styles.container}>
      <LinearGradient
      colors={['#009387', '#2bac83ff', '#fff']}
      style={styles.linearGradient}
      >
         <BannerAd
      unitId={banner}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
      <View style={styles.header}>
        <Turnos />
      </View>
      <View style={styles.body}>
        <View style={{width: '100%', alignItems: 'center', marginBottom: 20}} >

        < BtnHemergency />
        
        </View>
        
        <CarouselCards />
      
      </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  linearGradient: {
    flex: 1,
   
  },
  header: {
    flex: 1,
  },
  body: {
    flex: 1,
    marginTop: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
