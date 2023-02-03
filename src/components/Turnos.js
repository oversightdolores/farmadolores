import moment from 'moment';
import React, {useEffect} from 'react';
import {
  StyleSheet,View
} from 'react-native';
import {useDispatch,useSelector} from 'react-redux';
import CardsFarm from './CardsFarm';
import messaging from '@react-native-firebase/messaging';


const sendNotification = (name, address) => {
  // Subscribe to the topic
  messaging().subscribeToTopic('turnos');
  // Build the notification payload
  const notification = {
  title: 'Turno asignado',
  body: `Tienes turno en la farmacia ${name} ubicada en ${address}`,
  sound: 'default',
  };
  // Schedule the notification
  messaging().scheduleNotification(notification, {
  fireDate: Date.now() + 5000,
  })
}

const Turnos = ({navigation, rute}) => {
  const f = useSelector(state => state.farmacias);
  
  let col1 = '#00ff0dff';
  let col2 = '#087a41ff';
  
  const now = moment();

  
  
  let turno;
  f.forEach(pharmacy => {
    pharmacy.turn.forEach(t => {
      const turnStart = moment(t, 'M/D/YYYY').set({
        hour: 8,
        minute: 30,
        second: 0,
        millisecond: 0
      });
      const turnEnd = moment(t, 'M/D/YYYY').set({
        hour: 8,
        minute: 30,
        second: 0,
        millisecond: 0
      }).add(24, 'hours');

      if (now.isBetween(turnStart, turnEnd)) {
        turno = pharmacy;
        //sendNotification(turno.name, turno.dir);
      }
    });
  });


console.log(turno)



  return turno ?  (
    <View style={styles.turnosCont}>
      <View style={styles.turnos}>
        <CardsFarm
          detail={turno.detail}
          gps={turno.gps}
          horario={turno.horario}
          name={turno.name}
          dir={turno.dir}
          tel={turno.tel}
          image={turno.image}
          turno={true}
        />
      </View>
    </View>
  ): null
}
export default Turnos;

const styles = StyleSheet.create({
  turnosCont: {
    flex: 1,
    
  },
  turnosText: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
  contNull: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#red',
  },
  turnos: {
    backgroundColor: 'transparent',
  },
});
