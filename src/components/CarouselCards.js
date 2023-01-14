import React from "react";
import { View } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel-v4";
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from "./carouselCardItem";
import { useSelector } from "react-redux";
import { selectPublicidad } from "../redux/reducer";

const CarouselCards = () => {
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(true);
  const data = useSelector(selectPublicidad);
  
  
  return (
    <View>
       <Carousel
        layout="default"
        autoplay={true}
        layoutCardOffset={9}
        ref={isCarousel}
        data={data}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
      />
     {/*  <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: "rgba(0, 0, 0, 0.92)",
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />  */}
    </View>
  );
};

export default CarouselCards;
