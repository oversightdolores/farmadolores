import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React,{useContext,useEffect,useState} from 'react';
import {
  ScrollView,StyleSheet,View
} from 'react-native';
import {useInterstitialAd} from 'react-native-google-mobile-ads';
import LinearGradient from 'react-native-linear-gradient';
import Banner from '../components/Banner';
import BannerMax from '../components/BannerMax';
import BtnHemergency from '../components/BtnHemergency';
import CarouselCards from '../components/CarouselCards';
import Turnos from '../components/Turnos';
import AuthContext from '../components/context/AutContext';

const banner = 'ca-app-pub-1460570234418559/3397663182';
const banner1 = 'ca-app-pub-1460570234418559/5911692911';
const interest = /* __DEV__ ? TestIds.BANNER : */ 'ca-app-pub-1460570234418559/1592012526';

export default function Home() {
  const navigation = useNavigation();
  //const user = useSelector(selectUser)
  const {user, logout} = useContext(AuthContext)
  const Hora = moment().format('HH:mm:ss');
  const [hs, setHs] = useState('');
  const { isLoaded, isClosed, load, show } = useInterstitialAd(interest, {
    requestNonPersonalizedAdsOnly: false,
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
    <>
      <LinearGradient
      colors={['#009387', '#2bac83ff', '#fff']}
      style={styles.linearGradient}
      >
      <Banner banner={banner} />
    <ScrollView  style={styles.container}>
      <View style={styles.header}>
        <Turnos />
      </View>
      <View style={styles.body}>
        <View style={{width: '100%', alignItems: 'center', marginBottom: 20}} >

        < BtnHemergency />
        
        </View>
        
        <CarouselCards />
      
      </View>
      <View style={{width: '100%',height: 400, justifyContent: 'center', alignItems: 'center', marginBottom: 20}} >
     <BannerMax banner={banner1} />
      </View> 
    </ScrollView>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    height: '100%',
   
  },
  linearGradient: {
    flex: 1,
    height: '100%',
   
  },
  header: {
    flex: 1,
    marginBottom: 40,
  },
  body: {
    display: 'flex',
    flex: 1,
    marginTop: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
