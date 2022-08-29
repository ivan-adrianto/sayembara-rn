import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from '../components/Text';
import React from 'react';
import Button from '../components/Button';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Creators as AuthActions} from '../redux/AuthRedux';
import {useEffect} from 'react';

const Register = ({navigation}) => {
  const isLoading = useSelector(state => state.auth.isLoadingRegister);
  const error = useSelector(state => state.auth.errorRegister);

  const dispatch = useDispatch();
  const register = data => dispatch(AuthActions.registerRequest(data));
  const resetData = () => dispatch(AuthActions.resetRegisterState());

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');

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
    if (!fullname) {
      return showToast('Name is required');
    }
    if (!email) {
      return showToast('Email is required');
    }
    if (!regex.test(email)) {
      return showToast('Email is not valid');
    }
    if (!password) {
      return showToast('Password is required');
    }
    if (password !== verifyPassword) {
      return showToast('Verify password does not match');
    }
    if (password.length < 6) {
      return showToast('Password must be at least 6 characters');
    }
    return true;
  };

  const submit = () => {
    if (validate()) {
      const data = {
        fullname,
        email,
        password,
      };
      register(data);
    }
  };

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
        <TextInput
          style={styles.input}
          onChangeText={text => setFullname(text)}></TextInput>
        <Text bold fontSize={16}>
          Email
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setEmail(text)}
          autoCapitalize="none"
          textContentType="email"
          autoComplete="email"
          keyboardType="email-address"></TextInput>
        <Text bold fontSize={16}>
          Password
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}></TextInput>
        <Text bold fontSize={16}>
          Verify Password
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setVerifyPassword(text)}
          secureTextEntry={true}></TextInput>
      </View>
      <View style={styles.formFooter}>
        <Button onPress={submit}>
          {isLoading ? <ActivityIndicator color={'white'} /> : 'Join'}
        </Button>
        <View style={styles.redirectToLogin}>
          <Text fontSize={16}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('login')}>
            <Text bold color={'#1DD1A1'} fontSize={16}>
              {` Sign in here`}
            </Text>
          </TouchableOpacity>
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
    backgroundColor: "white"
  },
  title: {
    alignItems: 'center',
    marginTop: 44,
    marginBottom: 33,
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
