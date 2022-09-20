import {Image, ScrollView, StyleSheet, TextInput, View} from 'react-native';
import Text from '../components/Text';
import React from 'react';
import {IconProfile} from '../assets/icons';
import Button from '../components/Button';
import {LoginImage} from '../assets/images';

const Profile = () => {
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.photoProfileContainer}>
        {/* <IconProfile width={100} height={100} /> */}
        <Image source={LoginImage} style={styles.image} />
      </View>
      <View style={styles.contentSection}>
        <View style={styles.contentItem}>
          <Text fontSize={16} bold>
            First Name
          </Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.contentItem}>
          <Text fontSize={16} bold>
            Location
          </Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.contentItem}>
          <Text fontSize={16} bold>
            Bank
          </Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.contentItem}>
          <Text fontSize={16} bold>
            Account Number
          </Text>
          <TextInput style={styles.input} />
        </View>
        <Button style={styles.button}>Update</Button>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    alignItems: 'center',
    flexGrow: 1,
    paddingVertical: 38,
  },
  photoProfileContainer: {
    borderRadius: 200,
    height: 159,
    width: 159,
    backgroundColor: '#C4C4C4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 38,
  },
  image: {
    height: 159,
    width: 159,
    borderRadius: 100,
  },
  contentSection: {
    width: 277,
  },
  contentItem: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#C4C4C4',
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginTop: 7,
  },
  button: {
    marginTop: 23,
  },
});
