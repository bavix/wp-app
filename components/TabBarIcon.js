import React from 'react';
import { Icon } from 'react-native-elements';
import Colors from '../constants/Colors';
import { Platform } from 'react-native';

const ICON_PREFIX = Platform.OS === 'ios' ? 'ios-' : 'md-';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon
        raised={this.props.raised}
        name={ICON_PREFIX + this.props.name}
        type='ionicon'
        size={this.props.size ? this.props.size : 26}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
}
