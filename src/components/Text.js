import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CustomText = ({
  style,
  children,
  onPress,
  color,
  fontSize,
  bold,
  ...props
}) => {
  return (
    <Text onPress={onPress} style={[styles.text(color, fontSize, bold), style]} {...props}>
      {children}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  text: (color, size, bold) => ({
    fontFamily: bold ? 'Lato-Bold' : 'Lato-Regular',
    color: color || 'black',
    fontSize: size || 14,
  }),
});
