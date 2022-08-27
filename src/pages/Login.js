import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Text from '../components/Text';
import {LoginImage} from '../assets/images';
import Button from '../components/Button';

const Login = () => {
  return (
    <ScrollView style={styles.page}>
      <View style={styles.titleContainer}>
        <Text bold fontSize={32}>
          Sign in to your account
        </Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={LoginImage} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.formContainer}>
          <Text bold fontSize={16}>
            Email
          </Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            textContentType="email"
            autoComplete="email"
            keyboardType="email-address"></TextInput>
          <Text bold fontSize={16}>
            Password
          </Text>
          <TextInput style={styles.input} secureTextEntry={true}></TextInput>
        </View>
        <View style={styles.formFooter}>
          <Button>Sign In</Button>
          <View style={styles.redirectToLogin}>
            <Text fontSize={16}>Don't have an account?</Text>
            <TouchableOpacity>
              <Text bold color={'#1DD1A1'} fontSize={16}>
                {` Join here`}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 54,
    marginBottom: 32,
  },
  imageContainer: {
    alignItems: 'center',
  },
  contentContainer: {
    paddingHorizontal: 50,
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
    marginTop: 15,
  },
  redirectToLogin: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
