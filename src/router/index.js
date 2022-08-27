import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../pages/Home';
import BottomNavigator from '../components/BottomNavigator';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import Register from '../pages/Register';
import {SayembaraLogo} from '../assets/images';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const options = route => {
  return {
    headerShown: true,
    title: route.name === 'MovieReviews' ? route.params.title : 'Your Reviews',
    headerStyle: {backgroundColor: '#848282'},
    headerTitleStyle: {color: 'white', fontSize: 18, fontWeight: 'bold'},
    headerTintColor: 'white',
  };
};

// const HomeStackScreen = () => {
//   return (
//     <HomeStack.Navigator screenOptions={{headerShown: false}}>
//       <HomeStack.Screen name="Home" component={Home} />
//       <HomeStack.Screen name="MovieDetail" component={MovieDetail} />
//       <HomeStack.Screen
//         options={({route}) => options(route)}
//         name="MovieReviews"
//         component={MovieReviews}
//       />
//     </HomeStack.Navigator>
//   );
// };

const Header = () => {
  return (
    <View>
      <Image source={SayembaraLogo}></Image>
    </View>
  );
};

const MainApp = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerTitle: props => <Header {...props} />,
            headerStyle: {
              backgroundColor: '#1DD1A1',
              height: 71,
            },
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      tabBar={props => <BottomNavigator {...props} />}
      backBehavior="history">
      <Tab.Screen
        name="MyReviews"
        component={Home}
        options={({route}) => options(route)}
      />
      <Tab.Screen name="HomeTab" component={Home} />
      <Tab.Screen
        name="Profile"
        component={Home}
        options={{tabBarVisible: false}}
      />
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
