import React from 'react';
//import { getAllData, load, loading} from '../redux/action'

import {FlatList,View} from 'react-native';
import {useSelector} from 'react-redux';
import CardsFarm from '../components/CardsFarm';
import {selectFarmacias} from '../redux/reducer';

const Farmacias = () => {
  const data = useSelector(selectFarmacias);
  
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
