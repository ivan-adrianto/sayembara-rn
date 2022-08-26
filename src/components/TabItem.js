import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import { IconHome } from '../assets/icons';

const TabItem = ({isFocused, onPress, onLongPress, label}) => {
 
  const Icon = () => {
    if (label === 'Your Reviews')
      return isFocused ? <IconHome /> : <IconHome />;

    if (label === 'HomeTab')
      return isFocused ? <IconHome /> : <IconHome />;

    if (label === 'Profile') return <IconHome />;

    return <IconHome />;
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}>
      <Icon />
    </TouchableOpacity>
  );
};

export default TabItem;

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
    width: windowWidth / 3,
    backgroundColor: 'white',
  },
  text: isFocused => ({
    fontSize: 13,
    color: "black",
    marginTop: 8,
  }),
  profilePicture: {
    height: 25,
    width: 25,
    borderRadius: 50,
  },
});
