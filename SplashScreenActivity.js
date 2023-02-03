import React, { Component } from 'react';
import SplashScreen from './src/components/Splash';

class SplashScreenActivity extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('App');
    }, 2000);
  }

  render() {
    return <SplashScreen />;
  }
}

export default SplashScreenActivity;
