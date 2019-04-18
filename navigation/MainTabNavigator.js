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

const HomeStack = createAppContainer(createSwitchNavigator({
  ALS: AuthLoadingScreen,
  Auth: AuthStack,
  App: createStackNavigator({HomeScreen}),
}));

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name='information-circle-outline'
    />
  ),
};

const LinksStack = createAppContainer(createSwitchNavigator({
  ALS: AuthLoadingScreen,
  Auth: AuthStack,
  App: createStackNavigator({ProfileScreen}),
}));

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name='link'
    />
  ),
};

const WheelsStack = createStackNavigator({
  WheelsScreen,
  WheelDetailScreen,
});

WheelsStack.navigationOptions = {
  tabBarLabel: ' ', // 'Catalogue',
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

const DebugStack = createStackNavigator({
  SettingsScreen,
});

DebugStack.navigationOptions = {
  tabBarLabel: 'Debug',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name='bug'
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  WheelsStack,
  DebugStack,
  SettingsStack,
}, {
  initialRouteName: 'WheelsStack',
  // tabBarOptions: { showLabel: false }
});
