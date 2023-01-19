import {useNavigation} from "@react-navigation/native";
import React,{useEffect,useState} from "react";
import {Image,Linking,Pressable,ScrollView,StyleSheet,Text,View} from "react-native";
import Geolocation from 'react-native-geolocation-service';
import MapView,{Marker,PROVIDER_GOOGLE} from "react-native-maps";

const Details = ( { route } ) => {
  const {name, avatar, banner, gps, horario, dir, tel } = route.params;
 
  const navigation = useNavigation();

  const latitude = gps.latitude;
  const longitude = gps.longitude;
  
  useEffect(() => {
    navigation.setOptions({ title: name });

  }, []);


  const [gpes, setGpes] = useState(0);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [position, setPosition] = useState(null);

  ubicacion = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setPosition(position);
        console.log(position);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }




  



  



  
  const region = {
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0221,
  };
  const coordinat = { latitude: latitude, longitude: longitude }; 
  
  console.log('Destination:', coordinat);

  const onPhonePress = (item) => {
    console.log('Llamar', item);
    Linking.openURL(`tel:${item}`);
  }


  return (
    <ScrollView style={styles.container}>
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: banner }}
          style={styles.banner}
        />
        <Image
          source={{ uri: avatar }}
          style={styles.avatar}
        />
      </View>
      <View style={styles.body}>
        <View style={styles.bodyContent}>
        <Text style={styles.info}><Text style={{ fontWeight:'bold' }} >Direccion:</Text> {dir}  </Text>
       <View style={styles.tel}>
          <Pressable style={{ flexDirection: 'row' }} onPress={() => { onPhonePress(tel[0]) }}>
          <Text style={styles.info}><Text style={{ fontWeight:'bold' }} >Telefono:</Text> {tel[0]}  </Text>
            <Image
              source={require('../assets/telefono.png')}
              style={styles.llamar}
            />
          </Pressable>
          {
            tel[1] ?
            <Pressable style={{ flexDirection: 'row' }} onPress={() => { onPhonePress(tel[1]) }}>
            <Text style={styles.info}><Text style={{ fontWeight:'bold' }} >Telefono:</Text> {tel[1]}  </Text>
              <Image
                source={require('../assets/telefono.png')}
                style={styles.llamar}
              />
            </Pressable>
            : null
          }
        </View>

        <View style={styles.horario}>
          <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold' }}>Horario de Atencion</Text>
          <Text style={styles.hs}>{horario[0]} -A- {horario[1]} </Text>
          <Text style={styles.hs}>{horario[2]} -A- {horario[3]} </Text>
        </View>
        <View style={styles.map}>

          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={region}
            showsUserLocation={true}
            showsMyLocationButton={true}
            showsCompass={true}
            showsScale={true}
            showsTraffic={true}
            zoomEnabled={true}
            zoomControlEnabled={true}
            rotateEnabled={true}
            scrollEnabled={true}
            pitchEnabled={true}
            loadingEnabled={true}
            toolbarEnabled={true}
            moveOnMarkerPress={true}
            showsBuildings={true}
            showsIndoors={true}
            showsPointsOfInterest={true}
            showsIndoorLevelPicker={true}

          >
            <Marker
              coordinate={coordinat}
              title={name}
              description={dir}
            />
          </MapView>
          </View>
        </View>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  header: {
    backgroundColor: "#00BFFF",
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130,
  },
  banner: {
    width: '100%',
    height: 200,
  },
  
  body: {
    marginTop: 40,
  },
  bodyContent: {
    
    alignItems: "center",
    padding: 30,
  },
  map: {

    width: '100%',
    height: 200,
    marginTop: 5,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600",
  },
  info: {
    fontSize: 18,
    color: "black",
    marginTop: 5,
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center",
  },
  horario: {
    backgroundColor: "#2bac8384",
    width: 250,
    height: 150,
    borderRadius: 30,
    marginTop: 10,
    
    alignItems: "center",
  },
  hs: {
    marginTop: 10,
    fontSize: 16,
    color: "#696969",
  

  },
  tel: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    
   
  },
  llamar: {
    width: 30,
    height: 30,
    marginLeft: 10,
    marginTop: 5,
   
  }



});

export default Details;