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
import {LogBox} from 'react-native';
import ContestDetail from '../pages/ContestDetail';
import SubmitWork from '../pages/SubmitWork';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

const Header = ({navigation}) => {
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

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="home" component={Home} />
      <HomeStack.Screen name="contest-detail" component={ContestDetail} />
      <HomeStack.Screen name="submit-work" component={SubmitWork} />
    </HomeStack.Navigator>
  );
};

const MainApp = () => {
  const dispatch = useDispatch();
  const restoreLoginSession = () => dispatch(AuthActions.restoreLoginSession());

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const getToken = async () => {
    const token = await Keychain.getInternetCredentials('token');
    if (token) {
      addBearerToken(token.password);
      restoreLoginSession();
      // getProfile();
    }
    // setLoading(false);
  };

  useEffect(() => {
    getToken();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
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
      initialRouteName="homestack"
      tabBar={props => <BottomNavigator {...props} />}
      backBehavior="history">
      <Tab.Screen name="profile" component={Home} options={options} />
      <Tab.Screen
        name="homestack"
        component={HomeStackScreen}
        options={options}
      />
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
