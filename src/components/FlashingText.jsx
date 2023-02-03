import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const FlashingText = () => {
  const [color, setColor] = useState('#74d689');


  useEffect(() => {
    const interval = setInterval(() => {
      setColor(color === '#74d689' ? '#087a41ff' : '#74d689');
    }, 1000);
    return () => clearInterval(interval);
  }, [color]);

  return (
    <View style={{backgroundColor: color, justifyContent:'center', alignItems:'center', borderRadius: 8, width:100}} >
    <Text style={{fontWeight:'bold', color:'#fff', padding: 2, fontSize:10}}>
        De turno
        </Text>
        </View>
  );
};

export default FlashingText;
