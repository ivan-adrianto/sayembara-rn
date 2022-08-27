import {StyleSheet, TextInput, View} from 'react-native';
import Text from '../components/Text';
import React from 'react';
import Button from '../components/Button';

const Register = () => {
  return (
    <View style={styles.page}>
      <View style={styles.title}>
        <Text fontSize={32} bold>
          Create an account
        </Text>
      </View>
      <View style={styles.formContainer}>
        <Text bold fontSize={16}>
          Fullname
        </Text>
        <TextInput style={styles.input}></TextInput>
        <Text bold fontSize={16}>
          Email
        </Text>
        <TextInput style={styles.input}></TextInput>
        <Text bold fontSize={16}>
          Password
        </Text>
        <TextInput style={styles.input}></TextInput>
        <Text bold fontSize={16}>
          Verify Password
        </Text>
        <TextInput style={styles.input}></TextInput>
      </View>
      <View style={styles.formFooter}>
        <Button>Join</Button>
        <View style={styles.redirectToLogin}>
          <Text fontSize={16}>Already have an account?</Text>
          <Text bold color={'#1DD1A1'} fontSize={16}>
            {` Sign in here`}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingHorizontal: 50,
  },
  title: {
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 33,
  },
  formContainer: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#C0C0C0',
    borderRadius: 3,
    marginTop: 5,
    marginBottom: 15,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  formFooter: {
    flex: 1,
    marginTop: 50,
  },
  redirectToLogin: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: "center"
  },
});
