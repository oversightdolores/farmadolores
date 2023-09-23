import React, { useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';



const Loading = () => {

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color='#27bdbb' />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#bdbfc0'
  }
});

export default Loading;
