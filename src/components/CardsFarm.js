import {View, Text, Pressable, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {selectFarmacias} from '../redux/reducer';
import {useNavigation} from '@react-navigation/native';
import {Rating} from '@rneui/themed';


function getColorBySchedule(schedule) {
  const currentTime = new Date();
  let currentHour = currentTime.getHours();
  let currentMinutes = currentTime.getMinutes();
  const currentDate = currentTime.getDate();
  const currentMonth = currentTime.getMonth();
  const currentYear = currentTime.getFullYear();
  
  //open time
  let openHour = schedule[0].split(" ")[0].split(":")[0];
  let openMinutes = schedule[0].split(" ")[0].split(":")[1];
  let openAmPm = schedule[0].split(" ")[1];
  //closing time
  let closingHour = schedule[1].split(" ")[0].split(":")[0];
  let closingMinutes = schedule[1].split(" ")[0].split(":")[1];
  let closingAmPm = schedule[1].split(" ")[1];
  
  if(openAmPm === "PM" && openHour!=="12"){
    openHour = parseInt(openHour) + 12;
  }
  if(openAmPm === "AM" && openHour==="12"){
    openHour = "00";
  }
  
  if(closingAmPm === "PM" && closingHour!=="12"){
    closingHour = parseInt(closingHour) + 12;
  }
  if(closingAmPm === "AM" && closingHour==="12"){
    closingHour = "00";
  }
  
  //create date object with the open and closing time
  const openTime = new Date(currentYear, currentMonth, currentDate, openHour, openMinutes);
  const closingTime = new Date(currentYear, currentMonth, currentDate, closingHour, closingMinutes);
  //create date object with current time
  const current = new Date(currentYear, currentMonth, currentDate, currentHour, currentMinutes);
  
  if (current >= openTime && current < closingTime) {
    return <View style={{backgroundColor: 'succes', alignItems:'center', borderRadius: 8}} >
      <Text style={{fontWeight:'bold', color:'White'}}>Abierto</Text></View>;;
    } else if (current >= closingTime - 30 * 60 * 1000 && current < closingTime) {
    return <View style={{backgroundColor: 'warning', justifyContent:'center', alignItems:'center', borderRadius: 8}} >
      <Text style={{fontWeight:'bold', color:'White'}}>Cierra pronto</Text></View>;;
    } else {
    return <View style={{backgroundColor: 'tomato', justifyContent:'center', alignItems:'center', borderRadius: 8}} >
      <Text style={{fontWeight:'bold', color:'White'}}>Cerrado</Text></View>;
    }
    }



export default function CardsFarm({
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


  const onPress = e => {
    console.log('pressed');

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
          <View style={styles.cardHeaderRight}>
            {getColorBySchedule(horario)}
          </View>
      </View>
      <View style={styles.cardBody}>
        <Image style={styles.banner} source={{uri: detail}} />
      </View>
      <View style={styles.cardFooter}>
        <View style={styles.cardFooterLeft}>
          <Text style={styles.horario}>{horario[0]} -A- {horario[1]} </Text>
          <Text style={styles.horario}>{horario[2]} -A- {horario[3]} </Text>
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

/* 




    <View style={styles.container}>
      
                <View style={styles.item}>
                  <View style={styles.itemLeft}>
                  <View style={{width: 61,
      height: 61,
      borderColor: cool,
      borderWidth: 1.5,
      borderRadius: 100,
      marginRight: 10,}} >
                    <Image source={{uri: image} } style={styles.square} />
                     </View>
                  </View>
                  <View style={styles.itemRight}>
                    <Text style={styles.itemTitle}>{name}</Text>
                    <Text style={styles.itemText}>{dir}</Text>
                    <Text style={styles.itemText}>{tel[0]}</Text>
                  
                    </View>
                    <Pressable onPress={() => onPress(name) } style={styles.button} onHoverIn={styles.press } >
                    <Text style={styles.itemIr} > {'»'} </Text>
                  </Pressable>
                </View>
                    
    </View>
  )
}





const styles = StyleSheet.create({

    container: {
        flex: 1,
        
        alignItems: 'center',
        justifyContent: 'center',
        },

    
    itemIr: {
      
        color: 'gray',
        opacity: 0.5,
        fontSize: 30,
        
      
    },
    press: {
      backgroundColor: 'red',
    },

    
    button: {

        backgroundColor: 'white',
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.53,
        shadowRadius: 13.97,
        elevation: 21,
      },
    

    item: {
        
      backgroundColor: "#fff",
      padding: 15,
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 20,
      width: 350,
        height: 100,
    },
    itemLeft: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
    },
    itemRight: {
      width: 200,
      flexDirection: "column",
  
      
    },
    itemTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#000",
    },
  
    square: {
      width: 60,
      height: 60,
      backgroundColor: "#55BCF6",
      opacity: 100,
      borderRadius: 100,
      marginRight: 15,
    },
    itemText: {
      maxWidth: "80%",
      color: "#000",
    },
    circular: {
      width: 61,
      height: 61,
      borderWidth: 2,
      borderRadius: 100,
      marginRight: 15,
    },
  });
    */
