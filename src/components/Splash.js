
import {Image,StyleSheet,View} from 'react-native';




const Splash = () => {
  
    console.log('este es el splash')

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
