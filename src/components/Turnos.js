import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import CardsFarm from './CardsFarm';
import AuthContext from './context/AutContext';
import PushNotification from 'react-native-push-notification';

const NoTurnos = () => {
  return (
    <View style={styles.noTurnos}>
      <Image source={require('../assets/noTurnos.png')} style={styles.noTurnosImage} />
      <Text style={styles.noTurnosText}>No hay turnos disponibles</Text>
    </View>
  );
};

const Turnos = ({ navigation, route }) => {
  const { user } = useContext(AuthContext);
  console.log(user.fcmToken);
  const farmacias = useSelector((state) => state.farmacias);
  const [turno, setTurno] = useState(null);

  useEffect(() => {
    const now = DateTime.local().setZone('America/Argentina/Buenos_Aires');
    const turnStartBase = DateTime.local().set({
      hour: 8,
      minute: 30,
      second: 0,
      millisecond: 0,
    });

    const matchingPharmacy = farmacias.find((pharmacy) => {
      return pharmacy?.turn?.some((t) => {
        const turnStart = DateTime.fromFormat(t, 'M/d/yyyy', {
          zone: 'America/Argentina/Buenos_Aires',
        }).set({
          hour: turnStartBase.hour,
          minute: turnStartBase.minute,
          second: turnStartBase.second,
          millisecond: turnStartBase.millisecond,
        });
        const turnEnd = turnStart.plus({ hours: 24 });

        return now >= turnStart && now <= turnEnd;
      });
    });

    if (matchingPharmacy) {
      setTurno(matchingPharmacy);
    }

    const notificationTimes = [
      now.set({ hour: 9, minute: 0, second: 0, millisecond: 0 }),
      now.set({ hour: 13, minute: 30, second: 0, millisecond: 0 }),
      now.set({ hour: 20, minute: 0, second: 0, millisecond: 0 }),
    ];

    const nextNotificationTime = notificationTimes.find((time) => time > now);
    if (nextNotificationTime) {
      const timeUntilNotification = nextNotificationTime - now;

      // Programa la notificación para un tiempo futuro
      console.log('Notificaciones');

      PushNotification.localNotificationSchedule({
        title: 'Farmacia de turno',
        message: `La farmacia de turno es ${matchingPharmacy?.name}`,
        style: 'bigpicture',
        picture: matchingPharmacy?.image, // La imagen que deseas mostrar
        date: new Date(Date.now() + timeUntilNotification),
      });
      

      // Suscríbete al tópico "farmaTurnos" para enviar notificaciones remotas
      // Asegúrate de que el usuario esté autenticado y obtén su ID de usuario o información relevante
      if (user) {
        const senderId = '320257863836'; // Reemplaza con tu senderId de FCM
        const topic = 'farmaTurnos';

        // Suscríbete al tópico
        PushNotification.subscribeToTopic(senderId, topic);
      }
    }
  }, [farmacias]);

  return turno ? (
    <View style={styles.turnosCont}>
      <View style={styles.turnos}>
        <CardsFarm
          detail={turno?.detail}
          gps={turno?.gps}
          horario={turno?.horario}
          name={turno?.name}
          dir={turno?.dir}
          tel={turno?.tel}
          image={turno?.image}
          turno={true}
        />
      </View>
    </View>
  ) : (
    <NoTurnos />
  );
};

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
    backgroundColor: 'red',
  },
  turnos: {
    backgroundColor: 'transparent',
  },
  noTurnos: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTurnosImage: {
    resizeMode: 'center',
    borderRadius: 10,
    width: '100%',
    height: 250,
    marginBottom: 10,
    marginTop: 20,
  },
  noTurnosText: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  turnos: {
    backgroundColor: 'transparent',
  },
});
