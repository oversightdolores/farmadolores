;
import {useEffect,useState} from 'react';
import {Image,StyleSheet,View} from 'react-native';




const Splash = () => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }, []);

    

  return (
    <View style={styles.container}>
         
      <Image
        source={require('../assets/logo.png')}
        style={styles.splashImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#282b2a',
  },
  splashImage: {
    width: 200,
    height: 200,
  },
});

export default Splash;
