import React from 'react';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import ProfileScreen from '../screens/ProfileScreen';
import WheelsScreen from '../screens/catalogue/wheels/WheelsScreen';
import WheelDetailScreen from '../screens/catalogue/wheels/DetailScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import HomeScreen from "../screens/HomeScreen";
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import RegisterScreen from "../screens/auth/RegisterScreen";
import ForgotScreen from "../screens/auth/ForgotScreen";

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
  Forgot: ForgotScreen,
});

const FavoritesStack = createAppContainer(createSwitchNavigator({
  ALS: AuthLoadingScreen,
  Auth: AuthStack,
  App: createStackNavigator({HomeScreen}),
}));

FavoritesStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name='star'
    />
  ),
};

const ProfileStack = createAppContainer(createSwitchNavigator({
  ALS: AuthLoadingScreen,
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
  WheelsScreen,
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
  SettingsScreen,
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

const LinksStack = createStackNavigator({
  SettingsScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name='link'
    />
  ),
};

export default createBottomTabNavigator({
  SettingsStack,
  LinksStack,
  WheelsStack,
  FavoritesStack,
  ProfileStack,
}, {
  initialRouteName: 'WheelsStack',
  tabBarOptions: { showLabel: false }
});
