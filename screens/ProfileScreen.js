import React from 'react';
import {View} from 'react-native';
import api from '../helpers/Api';
import {Avatar, Icon, Text} from "react-native-elements";
import AuthPureComponent from "../components/AuthPureComponent";
import TokenRegister from "../helpers/TokenRegister";
import {client} from "../helpers/OAuth";
import {ICON_PREFIX} from "../components/TabBarIcon";
import Colors from "../constants/Colors";
import AuthStatus from "../helpers/AuthStatus";

export default class ProfileScreen extends AuthPureComponent {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Profile',
      headerRight: (
        <Icon
          containerStyle={{paddingRight: 15}}
          name={ICON_PREFIX + 'log-out'}
          type='ionicon'
          size={26}
          color={Colors.tintColor}
          onPress={async () => {
            if (await AuthStatus.isUser()) {
              const accessToken = await TokenRegister.getAccessToken();
              TokenRegister.removeToken().then(async () => {
                await client.revokeAsync(accessToken);
                navigation.navigate('Auth');
              }).catch(() => {
                alert('Error!');
              });
            }
          }}/>
      ),
    }
  };

  state = {
    profile: {}
  };

  componentDidMount() {
    super.componentDidMount();
    api.get('api/profile').then(({data}) => data).then(({data}) => {
      this.setState({profile: data})
    }).catch((e) => {

    });
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
