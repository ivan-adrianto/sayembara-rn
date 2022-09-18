import {Image, StyleSheet, TextInput, View} from 'react-native';
import Text from '../components/Text';
import React from 'react';
import {IconPlus} from '../assets/icons';
import {LoginImage} from '../assets/images';
import Button from '../components/Button';

const SubmitWork = () => {
  return (
    <View style={styles.page}>
      <View style={styles.titleContainer}>
        <Text fontSize={28} bold>
          Upload Your Files
        </Text>
      </View>
      <View style={styles.imageUploadContainer}>
        <Image source={LoginImage} style={styles.uploadedImage} />
        <View style={styles.uploadIconContainer}>
          <IconPlus style={styles.iconPlus} />
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <Text fontSize={16} bold>
          Description
        </Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          style={styles.descriptionBox}
        />
        <Button>Submit</Button>
      </View>
    </View>
  );
};

export default SubmitWork;

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: "center"
  },
  titleContainer: {
    textAlign: 'center',
    marginTop: 55,
    marginBottom: 46,
  },
  imageUploadContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingVertical: 9,
    width: 314,
    marginBottom: 22
  },
  uploadedImage: {
    height: 92,
    width: 92,
    marginLeft: 9,
  },
  uploadIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 92,
    width: 92,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderWidth: 2,
    borderColor: 'black',
    marginLeft: 9,
  },
  descriptionBox: {
    height: 108,
    width: 314,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#C0C0C0",
    marginTop: 7,
    marginBottom: 23
  }
});
