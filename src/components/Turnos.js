import moment from 'moment';
import React,{useEffect,useState} from 'react';
import {
  StyleSheet,Text,View
} from 'react-native';
import {useDispatch,useSelector} from 'react-redux';
import CardsFarm from './CardsFarm';

const Turnos = ({navigation, rute}) => {
  const f = useSelector(state => state.farmacias);
  const dispatch = useDispatch()
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

/*   for (let i = 0; i < f.length; i++) {
    for (let j = 0; j < f[i].turn.length; j++) {
      const turno = f[i].turn[j] === Fecha;

      if (turno) { */
      const turno = f.find(pharmacy => pharmacy.turn.find(t => t === Fecha));
      
        return turno ? (
          <View style={styles.turnosCont}>
            <View style={styles.turnos}>
              <Text style={styles.turnosText}>De Turno Hoy</Text>
              <CardsFarm
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
