import React from 'react'
import { View, Text } from 'react-native'
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';


const Banner = ({banner}) => {
  console.log(banner)
    return (
       
              <BannerAd
      unitId={banner}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
     
    />
        
    )
}

export default Banner
