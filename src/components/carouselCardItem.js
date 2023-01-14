import React, { useState } from "react";
import { StyleSheet, Dimensions, View, Text, Image, ScrollView ,Linking} from "react-native";
import { Button } from "react-native-paper";


export const SLIDER_WIDTH = Dimensions.get("window").width + 100;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

const CarouselCardItem = ({ item, index }) => {
 
  
  const onPress = () => {
    console.log(item.url)
    Linking.openURL(item.url)
    
  };

  
  //una card de publicidad con un boton que te lleva a la pagina de la publicidad
  return (
    <View style={styles.cardContainer}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.description} numberOfLines={3}>
          {item.description}
        </Text>
        <Button
          style={styles.button}
          mode="contained"
          onPress={onPress}
          color={'#FFA500'}
        >
          <Text style={styles.buttonText}>Ver</Text>
        </Button>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: ITEM_WIDTH,
    height: 250,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },
  textContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
  },
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: "white",
    marginTop: 10,
  },
  button: {
    marginTop: 10,
  },
});
//color: "#2bac8384",

export default CarouselCardItem;