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
import CDN, {BUCKET_USERS, VIEW_USERS_M} from "../helpers/CDN";

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
    image: null,
    profile: {},
  };

  componentDidMount() {
    super.componentDidMount();
    api.get('api/profile', {
      params: {
        include: ['image']
      }
    }).then(({data}) => data).then(({data: profile}) => {
      this.setState({profile, image: profile.image})
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
        source={CDN.getThumbnail(BUCKET_USERS, VIEW_USERS_M, this.state.image)}
        defaultSource={CDN.getPlaceholder(BUCKET_USERS)}
        showEditButton
      />

      <Text>{JSON.stringify(this.state.profile)}</Text>
    </View>
  }

}
