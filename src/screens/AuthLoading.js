import React from 'react'
import {ActivityIndicator, View, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {isUser} from "../helpers/tokenizer";

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

class AuthLoading extends React.PureComponent {

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
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

}

export default connect(AuthLoading.mapStateToProps)(AuthLoading);
