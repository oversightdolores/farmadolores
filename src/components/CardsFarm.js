import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FlashingText from './FlashingText';
import Horarios from './Horarios';
import { DateTime } from 'luxon';

const CardsFarm = ({
  name,
  dir,
  tel,
  image,
  gps,
  detail,
  horario,
  id,
  turno,
}) => {
  const navigation = useNavigation();


  const onPress = () => {
    navigation.navigate('Details', {
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

    // Función para dividir los horarios en grupos de dos
    const splitHorarios = (horarios) => {
      const groupedHorarios = [];
      for (let i = 0; i < horarios.length; i += 2) {
        groupedHorarios.push(horarios.slice(i, i + 2));
      }
      return groupedHorarios;
    };


  return (
    <LinearGradient
      colors={['rgba(255,255,255,0.5)', 'rgba(255,255,255,0.5)']}
      style={styles.card}
      key={id}
    >
      <View style={styles.cardHeader}>
        <View style={styles.cardHeaderLeft}>
          <Image style={styles.avatar} source={{ uri: image }} />
          <View style={styles.cardHeaderLeftText}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.dir}>{dir}</Text>
          </View>
        </View>
        <View style={styles.cardHeaderRight}>
          {turno ? <FlashingText /> : horario ? <Horarios horarios={horario} /> : null}
        </View>
      </View>
      <View style={styles.cardBody}>
        <Image style={styles.banner} source={{ uri: detail }} />
      </View>
      <View style={styles.cardFooter}>
      <View style={styles.cardFooterLeft}>
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
                      <Text key={index} style={styles.horario}>
                      {index === 0 ? '' : ' a '}
                      {timestamp}
                    </Text>
                    
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
        <View style={styles.cardFooterRight}>
          <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Ver más</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
};

export default CardsFarm;

const styles = StyleSheet.create({
  card: {
    
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius:10,
    margin: 10,
    shadowColor: 'rgba(255, 255, 255, 0.2)',
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
  horarioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardHeaderLeftText: {
    marginLeft: 10,
  },

  cardHeaderRight: {
    flexDirection: 'row',
    borderRadius: 8
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
    justifyContent: 'center',
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

