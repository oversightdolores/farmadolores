import React from 'react'
import { View, Text } from 'react-native'
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';


const BannerMax = ({banner}) => {
    return (
       
              <BannerAd
      unitId={banner}
      size={BannerAdSize.INLINE_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: false,
      }}
    />
        
    )
}

export default BannerMax
