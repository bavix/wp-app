import React from 'react';
import {View, Alert} from 'react-native';
import api from '../helpers/Api';
import {Avatar, Icon, Text, Tile} from "react-native-elements";
import AuthPureComponent from "../components/AuthPureComponent";
import TokenRegister from "../helpers/TokenRegister";
import Colors from "../constants/Colors";
import AuthStatus from "../helpers/AuthStatus";
import {ICON_PREFIX} from "../components/TabBarIcon";
import {client} from "../helpers/OAuth";

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
          onPress={() => {
            AuthStatus.isUser().then((authorized) => {
              if (!authorized) {
                return;
              }

              Alert.alert(
                'Logout',
                'Are you sure you want to logout?',
                [
                  {
                    text: 'No',
                    style: 'cancel',
                  },
                  {
                    text: 'Yes',
                    style: 'destructive',
                    onPress: async () => {
                      const accessToken = await TokenRegister.getAccessToken();
                      TokenRegister.removeToken().then(async () => {
                        await client.revokeAsync(accessToken);
                        navigation.navigate('Auth');
                      }).catch(() => {
                        alert('Error!');
                      });
                    }
                  },
                ]
              );
            });
          }}
        />
      ),
    }
  };

  state = {
    profile: {},
  };

  componentDidMount() {
    super.componentDidMount();
    api.get('api/profile').then(({data}) => data).then(({data: profile}) => {
      this.setState({profile})
    }).catch((e) => {
      // todo: check auth... -> logout
    });
  }

  render() {
    return <View>
      <Avatar
        rounded
        title='WP'
        size={160}
        placeholderStyle={{backgroundColor: '#cdc'}}
        showEditButton
      />

      <Text>{JSON.stringify(this.state.profile)}</Text>
    </View>
  }

}
