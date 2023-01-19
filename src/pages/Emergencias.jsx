import React from 'react';
//import { getAllData, load, loading} from '../redux/action'

import {useNavigation} from '@react-navigation/native';
import {FlatList,View} from 'react-native';
import {useSelector} from 'react-redux';
import CardsEmer from '../components/CardsEmer';
import {selectEmergencias} from '../redux/reducer';

const Emergencias = () => {
  const data = useSelector(selectEmergencias);
  const navigation = useNavigation();

  return (
    <View style={{flex: 1}}>
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
    </View>
  );
};
export default Emergencias;