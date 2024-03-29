import React from 'react';
import Colors from '../../constants/Colors';
import {Icon} from 'react-native-elements/src/index';
import {Platform} from 'react-native';

/**
 * @deprecated
 */
export const ICON_PREFIX = Platform.OS === 'ios' ? 'ios-' : 'md-';

/**
 * @deprecated
 */
export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon
        type='ionicon'
        raised={this.props.raised}
        reverse={this.props.reverse}
        name={ICON_PREFIX + this.props.name}
        size={this.props.size ? this.props.size : 30}
        color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
}
