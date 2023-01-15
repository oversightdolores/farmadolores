import React, {useEffect, useRef, useState} from 'react';
//import { getAllData, load, loading} from '../redux/action'

import {Button, Pressable, ScrollView, View, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getFarmacias} from '../redux/action';
import {loading, selectFarmacias} from '../redux/reducer';
import CardsFarm from '../components/CardsFarm';
import {useNavigation} from '@react-navigation/native';
import Perfil from './Perfil';
import Details from './Details';

const Farmacias = () => {
  const data = useSelector(selectFarmacias);
  const navigation = useNavigation();

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <CardsFarm
            id={item.id}
            horario={item.horario}
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
export default Farmacias;
