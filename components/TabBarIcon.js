import React from 'react';
import Colors from '../constants/Colors';
import { Icon } from 'react-native-elements';
import { Platform } from 'react-native';

const ICON_PREFIX = Platform.OS === 'ios' ? 'ios-' : 'md-';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon
        raised={this.props.raised}
        reverse={this.props.reverse}
        name={ICON_PREFIX + this.props.name}
        type='ionicon'
        size={this.props.size ? this.props.size : 26}
        color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
}
