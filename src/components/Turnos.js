import moment from 'moment-timezone';
import React, {useEffect} from 'react';
import {
  StyleSheet,View
} from 'react-native';
import {useDispatch,useSelector} from 'react-redux';
import CardsFarm from './CardsFarm';
import { DateTime } from 'luxon';
import PushNotification from 'react-native-push-notification';

// async function onDisplayNotification(name, tel, dir) {
//   // Cancelar notificaciones anteriores
//   PushNotification.cancelAllLocalNotifications();
  
//   // Crear la notificación
//   const notification = {
//     id: '1',
//     title: 'Farmacia de turno',
//     message: `La farmacia de turno es ${name} ubicada en ${dir} TEL:${tel}`,
//     smallIcon: 'ic_launcher',
//     largeIcon: 'ic_launcher',
//     vibrate: true,
//     vibration: 300,
//     playSound: true,
//     soundName: 'default',
//     autoCancel: true,
//     actions: '["Abrir", "Cancelar"]',
//     invokeApp: true,
//   };
   
//   // Configurar el trigger para que la notificación se muestre en 5 segundos
//   const dateTime = DateTime.local().plus({ seconds: 5 });
// const trigger = Platform.OS === 'ios'
//   ? {
//       date: dateTime.toISO(),
//     }
//   : {
//       date: dateTime.toMillis(),
//     };
  
//   // Programar la notificación con el trigger
//   PushNotification.localNotificationSchedule(notification, trigger);
// }

// // Configurar la librería PushNotification
// PushNotification.configure({
//   // Configuración para iOS
//   onRegister: function (token) {
//     console.log('PushNotification token:', token);
//   },
//   onNotification: function (notification) {
//     console.log('PushNotification notification:', notification);
//     notification.finish(PushNotification.FetchResult.NoData);
//   },
//   permissions: {
//     alert: true,
//     badge: true,
//     sound: true,
//   },
//   popInitialNotification: true,
//   requestPermissions: true,
// });




const Turnos = ({navigation, rute}) => {
  const f = useSelector(state => state.farmacias);


  let col1 = '#00ff0dff';
  let col2 = '#087a41ff';
  
  const now = moment().tz('America/Argentina/Buenos_Aires');
 
  let turno;
   
  
  f?.forEach(pharmacy => {
    pharmacy?.turn?.forEach(t => {
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
        
      }
    }) 
  }); 
  
 
 
/* const nineAM = moment().set({hour: 9, minute: 0, second: 0, millisecond: 0});
const threePM = moment().set({hour: 17, minute: 9, second: 0, millisecond: 0});
const ninePM = moment().set({hour: 21, minute: 0, second: 0, millisecond: 0});



if (now.isBefore(nineAM)) {
  setInterval(() => {
    onDisplayNotification(turno.name, turno.tel, turno.dir);
  }, nineAM.diff(now));
} else if (now.isBefore(threePM)) {
  setInterval(() => {
    onDisplayNotification(turno.name, turno.tel, turno.dir);
  }, threePM.diff(now));
} else if (now.isBefore(ninePM)) {
  setInterval(() => {
    onDisplayNotification(turno.name, turno.tel, turno.dir);
  }, ninePM.diff(now));
}


 */

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
