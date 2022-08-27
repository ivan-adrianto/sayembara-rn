import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Text from '../components/Text';
import {LoginImage} from '../assets/images';
import Button from '../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import {Creators as AuthActions} from '../redux/AuthRedux';

const Login = ({navigation}) => {
  const isLoading = useSelector(state => state.auth.isLoadingLogin);
  const error = useSelector(state => state.auth.errorLogin);

  const dispatch = useDispatch();
  const login = data => dispatch(AuthActions.loginRequest(data));
  const resetData = () => dispatch(AuthActions.resetLoginState());

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (error) {
      showToast(error);
      resetData();
    }
  }, [error]);

  const showToast = message => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  const validate = () => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (!email) {
      return showToast('Email is required');
    }
    if (!password) {
      return showToast('Password is required');
    }
    if (!regex.test(email)) {
      return showToast('The email is not valid');
    }
    return true;
  };

  const submit = () => {
    if (validate()) {
      login({email, password});
    }
  };
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
            onChangeText={text => setEmail(text)}
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"></TextInput>
          <Text bold fontSize={16}>
            Password
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}></TextInput>
        </View>
        <View style={styles.formFooter}>
          <Button onPress={submit}>
            {isLoading ? <ActivityIndicator color={'white'} /> : 'Sign In'}
          </Button>
          <View style={styles.redirectToLogin}>
            <Text fontSize={16}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('register')}>
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
