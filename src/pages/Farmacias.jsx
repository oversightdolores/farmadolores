import React from 'react';
//import { getAllData, load, loading} from '../redux/action'

import {FlatList,View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import CardsFarm from '../components/CardsFarm';
import {selectFarmacias} from '../redux/reducer';
import Banner from '../components/Banner';

const Farmacias = () => {
  const data = useSelector(selectFarmacias);
  
  return (
    <LinearGradient
    colors={['#009387', '#2bac83ff', '#fff']}
      style={styles.linearGradient}
      >
        <Banner />
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
    </LinearGradient>
  );
};
export default Farmacias;
const styles = StyleSheet.create({
  
  linearGradient: {
    flex: 1,
    
  }
})