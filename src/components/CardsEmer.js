import {View, Text, Pressable, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {selectFarmacias} from '../redux/reducer';
import {useNavigation} from '@react-navigation/native';
import {Rating} from '@rneui/themed';

export default function CardsEmer({
  name,
  dir,
  tel,
  image,
  gps,
  detail,
  horario,
  id,
}) {
  const navigation = useNavigation();

  const [date, setDate] = useState(moment().format('DD/MM/YYYY'));
  const data = useSelector(selectFarmacias);
  const [rating, setRating] = useState(10);

  const [farm, setFarm] = useState([]);

  const [hora, setHora] = useState(moment().format('LT'));

  const load = false;
  var color = '';
  const hs = () => {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].horario.length; j++) {
        if (data[i].horario[j] >= '08:00' && data[i].horario[j] <= '12:00') {
          return (color = 'green');
        } else if (
          data[i].horario[j] >= '12:00' &&
          data[i].horario[j] <= '12:30'
        ) {
          return (color = 'yellow');
        } else if (
          data[i].horario[j] >= '12:30' &&
          data[i].horario[j] <= '16:00'
        ) {
          return (color = 'red');
        } else if (
          data[i].horario[j] >= '16:00' &&
          data[i].horario[j] <= '20:00'
        ) {
          return (color = 'green');
        } else if (
          data[i].horario[j] >= '20:00' &&
          data[i].horario[j] <= '20:30'
        ) {
          return (color = 'yellow');
        } else if (
          data[i].horario[j] >= '20:30' &&
          data[i].horario[j] <= '24:00'
        ) {
          return (color = 'red');
        } else if (
          data[i].horario[j] >= '00:00' &&
          data[i].horario[j] <= '08:00'
        ) {
          return (color = 'red');
        }
      }
    }
  };
  useEffect(() => {
    hs();
  }, [hora, rating]);

  const onPress = e => {
    console.log('pressed');

    navigation.navigate('DetailEmer', {
      id: id,
      name: name,
      dir: dir,
      tel: tel,
      avatar: image,
      banner: detail,
      horario: horario,
      gps: gps,
    });
  };

  const cool = hs();

  return (
    <View style={styles.card} key={id}>
      <View style={styles.cardHeader}>
        <View style={styles.cardHeaderLeft}>
          <Image style={styles.avatar} source={{uri: image}} />
          <View style={styles.cardHeaderLeftText}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.dir}>{dir}</Text>
          </View>
        </View>
      </View>
      <View style={styles.cardBody}>
        <Image style={styles.banner} source={{uri: detail}} />
      </View>
      <View style={styles.cardFooter}>
        <View style={styles.cardFooterLeft}>
          {/* <Text style={styles.horario}>{horario[0]} -A- {horario[1]} </Text>
          <Text style={styles.horario}>{horario[2]} -A- {horario[3]} </Text> */}
        </View>
        <View style={styles.cardFooterRight}>
          <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Ver más</Text>
          </Pressable>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
  },
  cardHeaderLeftText: {
    marginLeft: 10,
  },

  cardHeaderRight: {
    flexDirection: 'row',
  },
  cardBody: {
    padding: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  cardFooterLeft: {
    padding: 5,
    flexDirection: 'column',
  },
  cardFooterRight: {
    flexDirection: 'row',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  banner: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  dir: {
    fontSize: 12,
    color: '#666',
  },
  tel: {
    fontSize: 12,
    color: '#666',
  },
  horario: {
    fontSize: 12,
    color: '#666',
  },
  button: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
  },

  rating: {
    flexDirection: 'row',
    backgroundColor: '#00000000',
    padding: 5,
  },
  ratingText: {
    fontSize: 10,
    color: '#00000000',
    alignSelf: 'center',
  },
});