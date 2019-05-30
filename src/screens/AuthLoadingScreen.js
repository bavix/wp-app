import React from 'react'
import {ActivityIndicator, View} from 'react-native'
import {connect} from 'react-redux'
import {isUser} from "../helpers/tokenizer";

class AuthLoadingScreen extends React.PureComponent {

  static mapStateToProps = ({user}) => user.toJS();

  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = () => {
    if (isUser(this.props.token)) {
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

export default connect(AuthLoadingScreen.mapStateToProps)(AuthLoadingScreen);
