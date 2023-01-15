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

  const Fecha = moment().format('M/D/YYYY');

      const turno = f.find(pharmacy => pharmacy.turn.find(t => t === Fecha));
        return turno ? (
          <View style={styles.turnosCont}>
            <View style={styles.turnos}>
              <Text style={styles.turnosText}>De Turno Hoy</Text>
              <CardsFarm
                turno={turno ? true : false}
                detail={turno.detail}
                gps={turno.gps}
                horario={turno.horario}
                name={turno.name}
                dir={turno.dir}
                tel={turno.tel}
                image={turno.image}
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
    backgroundColor: '#2bac83ff',
  },
});
