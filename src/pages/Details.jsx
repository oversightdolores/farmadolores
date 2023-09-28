import {useNavigation} from "@react-navigation/native";
import React,{useEffect,useState} from "react";
import {Image,Linking,ScrollView,StyleSheet,Text,TouchableOpacity,View} from "react-native";
import Geolocation from 'react-native-geolocation-service';
import MapView,{Marker,PROVIDER_GOOGLE} from "react-native-maps";
import Banner from "../components/Banner";
import Icon from "react-native-vector-icons/FontAwesome5";
import {DateTime} from "luxon";

const Details = ( { route } ) => {
  const {name, avatar, banner, gps, horario, dir, tel } = route.params;
const banner4 = 'ca-app-pub-1460570234418559/8346284564';
  
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
  

  const onPhonePress = (item) => {
    Linking.openURL(`tel:${item}`);
  }

  const splitHorarios = (horarios) => {
    const groupedHorarios = [];
    for (let i = 0; i < horarios.length; i += 2) {
      groupedHorarios.push(horarios.slice(i, i + 2));
    }
    return groupedHorarios;
  };


  return (
    <>
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
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',  }} >
          <Text style={styles.info}><Text style={{ fontWeight:'bold' }} >Telefono:</Text> {tel[0]}  </Text>
          <TouchableOpacity onPress={() => { onPhonePress(tel[0]) }}>
             <Icon name='phone' size={20} color={'green'} style={{backgroundColor: '#DCDCDC', padding: 5, borderRadius: 100}}   />
          </TouchableOpacity>
          </View>
          {
            tel[1] ?
            <View style={{ flexDirection: 'row' }} >
            <Text style={styles.info}><Text style={{ fontWeight:'bold' }} >Telefono:</Text> {tel[1]}  </Text>
            <TouchableOpacity onPress={() => { onPhonePress(tel[1]) }}>
             <Icon name='phone' size={20} color={'green'} style={{backgroundColor: '#DCDCDC', padding: 5, borderRadius: 100}}   />
          </TouchableOpacity>
            </View>
            : null
          }
        </View>

          <View style={styles.cardFooterLeft}>
          <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold' }}>Horario de Atencion</Text>
          {horario && horario.length > 0 ? (
            splitHorarios(horario).map((horarioGroup, groupIndex) => (
              <View key={groupIndex} style={styles.horarioGroup}>
                {horarioGroup.map((timestampData, index) => {
                  if (timestampData && timestampData.seconds) {
                    const seconds = timestampData.seconds;
                    const nanoseconds = timestampData.nanoseconds / 1e6;
                    const timestamp = DateTime.fromMillis(seconds * 1000 + nanoseconds, { zone: 'utc' })
                      .setZone('America/Argentina/Buenos_Aires')
                      .toLocaleString(DateTime.TIME_24_SIMPLE);
                  
                    return (
                      <View style={{ display: 'flex', flexWrap: 'wrap',  flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 5}} key={index}  >
                      <Text key={index} style={styles.horario}>
                      {index === 0 ? '' : ' a '}
                      {timestamp}
                    </Text>
                    </View>
                    );
                  }
                  return null;
                })}
              </View>
            ))
          ) : (
            <Text style={styles.horario}>Horario no disponible</Text>
          )}
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
    <Banner banner={banner4} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  horarioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
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
  cardFooterLeft: {
    width: 250,
    height: 150,
    display: 'flex',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    padding: 5,
    backgroundColor: "#2bac8384",
  },
  horario: {
   fontSize: 16,
   color: "#696969",
   
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