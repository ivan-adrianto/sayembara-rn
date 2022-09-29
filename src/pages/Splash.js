import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { SayembaraLogo } from '../assets/images';

const Splash = () => {
  return (
    <View style={styles.page}>
      <Image source={SayembaraLogo} style={styles.image}/>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#1DD1A1',
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    height: 45,
  }
});
