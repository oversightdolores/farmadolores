import React from 'react'
import { View, Text } from 'react-native'
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

const banner = /* __DEV__ ? TestIds.BANNER : */ 'ca-app-pub-1460570234418559/3397663182';

const Banner = () => {
    return (
       
              <BannerAd
      unitId={banner}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
        
    )
}

export default Banner
