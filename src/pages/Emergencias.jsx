import React, {useEffect, useRef, useState} from 'react';
//import { getAllData, load, loading} from '../redux/action'

import {Button, Pressable, ScrollView, View, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {loading, selectEmergencias} from '../redux/reducer';
import CardsEmer from '../components/CardsEmer';
import {useNavigation} from '@react-navigation/native';
import Perfil from './Perfil';
import Details from './Details';

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