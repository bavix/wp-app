import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import AuthStatus from '../../helpers/AuthStatus';

export default class AuthLoadingScreen extends React.PureComponent {

  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    AuthStatus.isUser().then((isUser) => {
      this.props.navigation.navigate(isUser ? 'App' : 'Auth');
    });
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

}
