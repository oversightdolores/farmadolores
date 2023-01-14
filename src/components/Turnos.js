import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Avatar,
  Heading,
  Pressable,
  Linking,
  StyleSheet,
} from 'react-native';
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';
import {selectFarmacias} from '../redux/reducer';
import {getFarmacias} from '../redux/action';
import CardsFarm from './CardsFarm';

const Turnos = ({navigation, rute}) => {
  const f = useSelector(selectFarmacias);

  const prueba = 'es la prueb de la farmacia';

  let col1 = '#00ff0dff';
  let col2 = '#087a41ff';
  const [color, setColor] = useState(col1);

  const Fecha = moment().format('M/D/YYYY');

  useEffect(() => {
    const interval = setInterval(() => {
      if (color === col1) {
        setColor(col2);
      } else {
        setColor(col1);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [color]);

  for (let i = 0; i < f.length; i++) {
    for (let j = 0; j < f[i].turn.length; j++) {
      const turno = f[i].turn[j] === Fecha;

      if (turno) {
        return (
          <View style={styles.turnosCont}>
            <View style={styles.turnos}>
              <Text style={styles.turnosText}>De Turno Hoy</Text>
              <CardsFarm
                detail={f[i].detail}
                gps={f[i].gps}
                horario={f[i].horario}
                name={f[i].name}
                dir={f[i].dir}
                tel={f[i].tel}
                image={f[i].image}
              />
            </View>
          </View>
        );
      }
    }
  }
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
    backgroundColor: '#red',
  },
  turnos: {
    backgroundColor: '#2bac83ff',
  },
});
