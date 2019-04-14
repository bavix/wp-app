import React from 'react';
import {View} from 'react-native';
import api from '../helpers/Api';
import {Avatar, Text} from "react-native-elements";

export default class ProfileScreen extends React.PureComponent {

  static navigationOptions = {
    title: 'Profile'
  };

  state = {
    profile: {}
  };

  componentDidMount() {
    api.get('api/profile').then(({data}) => data).then(({data}) => {
      this.setState({profile: data})
    })
  }

  render() {
    return <View>
      <Avatar
        rounded
        title='WP'
        size={240}
        placeholderStyle={{backgroundColor: '#cdc'}}
        showEditButton
      />

      <Text>{JSON.stringify(this.state.profile)}</Text>
    </View>
  }

}