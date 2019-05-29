import React from 'react'
import {ActivityIndicator, View} from 'react-native'
import AuthStatus from '../../helpers/AuthStatus'
import {connect} from 'react-redux'

class AuthLoadingScreen extends React.PureComponent {

  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = () => {
    if (this.props.user.auth) {
      return this.props.navigation.navigate('App')
    }

    return this.props.navigation.navigate('Auth')
  };

  render() {
    return (
      <View>
        <ActivityIndicator/>
      </View>
    );
  }

}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(AuthLoadingScreen);
