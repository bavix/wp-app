import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import WheelsScreen from '../screens/WheelsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='information-circle-outline'
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='link'
    />
  ),
};

const WheelsStack = createStackNavigator({
  Settings: WheelsScreen,
});

WheelsStack.navigationOptions = {
  tabBarLabel: ' ', // 'Catalogue',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      raised
      focused={focused}
      name='list' />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='cog'
    />
  ),
};

export default createBottomTabNavigator({
  Home: HomeStack,
  Links: LinksStack,
  Wheels: WheelsStack,
  Settings: SettingsStack,
  Debug: SettingsStack,
}, {
  initialRouteName: 'Wheels',
});
