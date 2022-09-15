import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Text from '../components/Text';

const Button = ({children, backgroundColor, onPress, style}) => {
  return (
    <TouchableOpacity style={[styles.button(backgroundColor), style]} onPress={onPress}>
      <Text color={'white'} bold fontSize={16}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: backgroundColor => ({
    backgroundColor: backgroundColor || '#1DD1A1',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 3,
    paddingVertical: 12,
  }),
});
