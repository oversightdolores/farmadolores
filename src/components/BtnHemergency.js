import React from 'react'
import { View, Text, TouchableOpacity, Dimensions, Linking } from 'react-native'
import {useSelector} from 'react-redux';
import {selectEmergencias} from '../redux/reducer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Carousel} from 'react-native-snap-carousel-v4';



     const renderItems = ({item}) => {
        const onPhonePress = (item) => {
            Linking.openURL(`tel:${item}`);
          }
        return (
            <View style={{height: 100, width: '100%', padding: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', borderRadius: 8, backgroundColor: 'rgba(255, 255, 255, 0.6)'}}>
            <View style={{flexDirection: 'column'}}>
             <Text style={{fontWeight: 'bold', fontSize: 18}} >{item.name}</Text>
             <Text style={{ color: 'gray', fontSize: 15}}>{item.tel[0]}</Text>
             </View> 
             <TouchableOpacity onPress={() => onPhonePress(item.tel[0])} style={{backgroundColor: 'rgba(255, 255, 255, 0.5)', padding:5, borderRadius: 100}}>
             <Icon name='phone' size={30} color={'green'}   />
             </TouchableOpacity>
         </View>
        )
     }


const BtnHemergency = () => {
  const [index, setIndex] = React.useState(0);
  const data = useSelector(selectEmergencias);
   const SLIDER_WIDTH = Dimensions.get("window").width + 90;
 const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

    return (
        <>
       <Carousel
  layout="default"
  layoutCardOffset={9}
  autoplay={true}
  autoplayInterval={8000} // <-- establece el intervalo en 5 segundos
  data={data}
  renderItem={renderItems}
  sliderWidth={5500}
  sliderHeight={400}
  itemWidth={393}
  onSnapToItem={(index) => setIndex(index)}
  useScrollView={true}
/>
</>
       
    )
}

export default BtnHemergency
