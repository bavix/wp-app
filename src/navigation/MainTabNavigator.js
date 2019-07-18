import React from 'react';
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import ProfileScreen from '../screens/Profile';
import List from '../screens/catalogue/wheels/List';
import WheelDetailScreen from '../screens/catalogue/wheels/Detail';
import Info from '../screens/Info';
import LoginScreen from '../screens/auth/SignIn';
import HomePage from "../screens/HomePage";
import Switcher from '../screens/AuthLoading';
import SignUp from "../screens/auth/SignUp";
import Forgot from "../screens/auth/Forgot";
import WheelsTour from "../screens/WheelsTour";

const AuthStack = createStackNavigator({
  SignIn: LoginScreen,
  SignUp: SignUp,
  Forgot: Forgot,
});

const FavoritesStack = createAppContainer(createSwitchNavigator({
  ALS: Switcher,
  Auth: AuthStack,
  App: createStackNavigator({HomeScreen: HomePage}),
}));

FavoritesStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name='bookmark'
    />
  ),
};

const ProfileStack = createAppContainer(createSwitchNavigator({
  ALS: Switcher,
  Auth: AuthStack,
  App: createStackNavigator({ProfileScreen}),
}));

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name='contact'
    />
  ),
};

const WheelsStack = createStackNavigator({
  WheelsScreen: List,
  WheelDetailScreen,
});

WheelsStack.navigationOptions = {
  tabBarLabel: 'Catalogue',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      raised
      reverse
      size={32}
      focused={focused}
      name='list'/>
  )
};

const SettingsStack = createStackNavigator({
  SettingsScreen: WheelsTour,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name='settings'
    />
  ),
};

const InfoStack = createStackNavigator({
  Info,
});

InfoStack.navigationOptions = {
  tabBarLabel: 'Info',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name='information-circle-outline'
    />
  ),
};

export default createBottomTabNavigator({
  SettingsStack,
  FavoritesStack,
  WheelsStack,
  InfoStack,
  ProfileStack,
}, {
  initialRouteName: 'WheelsStack',
  tabBarOptions: {showLabel: false},
});
