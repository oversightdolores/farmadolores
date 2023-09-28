import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import CardsFarm from './CardsFarm';
import messaging from '@react-native-firebase/messaging';


const NoTurnos = () => {
  return (
    <View style={styles.noTurnos}>
      <Image source={require('../assets/noTurnos.png')} style={styles.noTurnosImage} />
      <Text style={styles.noTurnosText}>No hay turnos disponibles</Text>
    </View>
  );
};

const Turnos = ({ navigation, route }) => {
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
  )
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
