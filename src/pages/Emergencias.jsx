import React from 'react';
//import { getAllData, load, loading} from '../redux/action'

import {useNavigation} from '@react-navigation/native';
import {FlatList,View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import CardsEmer from '../components/CardsEmer';
import {selectEmergencias} from '../redux/reducer';
import LinearGradient from 'react-native-linear-gradient';

const Emergencias = () => {
  const data = useSelector(selectEmergencias);
  const navigation = useNavigation();

  return (
    <View style={{flex: 1}}>
      <LinearGradient
    colors={['#009387', '#2bac83ff', '#fff']}
    style={styles.linearGradient}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <CardsEmer
            id={item.id}
            gps={item.gps}
            detail={item.detail}
            image={item.image}
            name={item.name}
            dir={item.dir}
            tel={item.tel}
          />
        )}
        keyExtractor={item => item.name}
      />
      </LinearGradient>
    </View>
  );
};
export default Emergencias;

const styles = StyleSheet.create({
  
  linearGradient: {
    flex: 1,
    
  }
})