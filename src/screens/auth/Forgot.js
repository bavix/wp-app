import React, {Component} from 'react';
import {View} from 'react-native';
import AuthPure from "../../components/AuthPure";
import {connect} from 'react-redux'

class Forgot extends AuthPure {

  static mapStateToProps = ({user}) => user.toJS();

  static navigationOptions = {
    title: 'Forgot'
  };

  render() {
    return <View/>
  }

}

export default connect(
  Forgot.mapStateToProps
)(Forgot);
