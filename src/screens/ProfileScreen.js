import React, { Component } from 'react';
import {View, Alert} from 'react-native';
import api from '../../helpers/Api';
import {Avatar, Icon, Text, Tile} from "react-native-elements/src/index";
import AuthPureComponent from "../components/AuthPureComponent";
import TokenRegister from "../../helpers/TokenRegister";
import Colors from "../../constants/Colors";
import AuthStatus from "../../helpers/AuthStatus";
import {ICON_PREFIX} from "../components/TabBarIcon";
import {client} from "../../helpers/OAuth";
import CDN, {BUCKET_USERS, VIEW_USERS_M} from "../../helpers/CDN";

import { ScrollView, Switch, StyleSheet } from 'react-native'
import { ListItem } from 'react-native-elements/src/index'
import PropTypes from 'prop-types'

import { Icon as BaseIcon } from 'react-native-elements/src/index'
import { Icon as Chevron } from 'react-native-elements/src/index'
import { Text as InfoText } from 'react-native-elements/src/index'


const styles = StyleSheet.create({
  scroll: {
    backgroundColor: 'white',
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
  },
  userImage: {
    marginRight: 12,
  },
  listItemContainer: {
    height: 55,
    borderWidth: 0.5,
    borderColor: '#ECECEC',
  },
})

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
    const avatar = CDN.getThumbnail(BUCKET_USERS, VIEW_USERS_M, this.state.image);
    return (

      <ScrollView style={styles.scroll}>
        <View style={styles.userRow}>
          <View style={styles.userImage}>
            <Avatar
              rounded
              size="large"
              source={avatar}
            />
          </View>
          <View>
            <Text style={{ fontSize: 16 }}>{this.state.profile.name}</Text>
            <Text
              style={{
                color: 'gray',
                fontSize: 16,
              }}
            >
              {this.state.profile.email}
            </Text>
          </View>
        </View>
        <InfoText text="Account" />
        <View>
          <ListItem
            hideChevron
            title="Push Notifications"
            containerStyle={styles.listItemContainer}
            rightElement={
              <Switch
                // onValueChange={this.onChangePushNotifications}
                value={false}
              />
            }
            leftIcon={
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#FFADF2',
                }}
                icon={{
                  type: 'material',
                  name: 'notifications',
                }}
              />
            }
          />
          <ListItem
            // chevron
            title="Currency"
            rightTitle="USD"
            rightTitleStyle={{ fontSize: 15 }}
            // onPress={() => this.onPressOptions()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{ backgroundColor: '#FAD291' }}
                icon={{
                  type: 'font-awesome',
                  name: 'money',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="Location"
            rightTitle="New York"
            rightTitleStyle={{ fontSize: 15 }}
            // onPress={() => this.onPressOptions()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{ backgroundColor: '#57DCE7' }}
                icon={{
                  type: 'material',
                  name: 'place',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="Language"
            rightTitle="English"
            rightTitleStyle={{ fontSize: 15 }}
            // onPress={() => this.onPressOptions()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{ backgroundColor: '#FEA8A1' }}
                icon={{
                  type: 'material',
                  name: 'language',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
        </View>
        <InfoText text="More" />
        <View>
          <ListItem
            title="About US"
            // onPress={() => this.onPressOptions()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{ backgroundColor: '#A4C8F0' }}
                icon={{
                  type: 'ionicon',
                  name: 'md-information-circle',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="Terms and Policies"
            // onPress={() => this.onPressOptions()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{ backgroundColor: '#C6C7C6' }}
                icon={{
                  type: 'entypo',
                  name: 'light-bulb',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="Share our App"
            // onPress={() => this.onPressOptions()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#C47EFF',
                }}
                icon={{
                  type: 'entypo',
                  name: 'share',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="Rate Us"
            // onPress={() => this.onPressOptions()}
            containerStyle={styles.listItemContainer}
            badge={{
              value: 5,
              textStyle: { color: 'white' },
              containerStyle: { backgroundColor: 'gray', marginTop: 0 },
            }}
            leftIcon={
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#FECE44',
                }}
                icon={{
                  type: 'entypo',
                  name: 'star',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="Send FeedBack"
            // onPress={() => this.onPressOptions()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#00C001',
                }}
                icon={{
                  type: 'materialicon',
                  name: 'feedback',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
        </View>
      </ScrollView>
    )
  }

}