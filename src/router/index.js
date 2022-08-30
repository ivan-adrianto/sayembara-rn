import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../pages/Home';
import BottomNavigator from '../components/BottomNavigator';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector, useDispatch} from 'react-redux';
import Register from '../pages/Register';
import {SayembaraLogo} from '../assets/images';
import Login from '../pages/Login';
import * as Keychain from 'react-native-keychain';
import {Creators as AuthActions} from '../redux/AuthRedux';
import {addBearerToken} from '../services/apiServices';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Header = () => {
  return (
    <View>
      <Image source={SayembaraLogo}></Image>
    </View>
  );
};

const options = {
  headerTitle: props => <Header {...props} />,
  headerStyle: {
    backgroundColor: '#1DD1A1',
    height: 71,
  },
  headerTitleAlign: 'center',
  headerLeft: null,
};

const MainApp = () => {
  const dispatch = useDispatch();
  const restoreLoginSession = () => dispatch(AuthActions.restoreLoginSession());

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const getToken = async () => {
    const token = await Keychain.getInternetCredentials('token');
    if (token) {
      restoreLoginSession();
      addBearerToken(token.password);
      // getProfile();
    }
    // setLoading(false);
  };
  
  useEffect(() => {
    getToken();
  }, []);

  if (!isLoggedIn) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="login" component={Login} options={options} />
        <Stack.Screen name="register" component={Register} options={options} />
      </Stack.Navigator>
    );
  }

  return (
    <Tab.Navigator
      initialRouteName="home"
      tabBar={props => <BottomNavigator {...props} />}
      backBehavior="history">
      <Tab.Screen name="profile" component={Home} options={options} />
      <Tab.Screen name="home" component={Home} options={options} />
      <Tab.Screen name="my contests" component={Home} options={options} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({});
