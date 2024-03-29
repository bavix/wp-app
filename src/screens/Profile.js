import React, {Component} from 'react'
import {Alert, ScrollView, StyleSheet, Switch, View} from 'react-native'
import api from '../helpers/api';
import {
  Avatar,
  Icon,
  Icon as BaseIcon,
  Icon as Chevron,
  ListItem,
  Text,
  Text as InfoText
} from "react-native-elements/src/index"
import TokenRegister from "../../helpers/TokenRegister"
import {connect} from 'react-redux'
import {user} from "../actions"
import {bindActionCreators} from "redux"
import {ICON_PREFIX} from "../components/TabBarIcon"
import Colors from "../../constants/Colors";
import AuthPure from "../components/AuthPure";
import {getThumbnail} from '../helpers/cdn'
import {thumbnails} from '../constants'

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
});

class Profile extends AuthPure {

  static mapStateToProps = ({user}) => user.toJS();

  static mapDispatchToProps = dispatch => bindActionCreators(
    {signOut: user.signOut},
    dispatch,
  );

  state = {
    image: null,
    profile: {},
  };

  static navigationOptions = ({navigation}) => {
    const {state} = navigation;
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
                    onPress: state.params.handleSignOut
                  },
                ]
              );
          }}
        />
      ),
    }
  };

  async logout() {
    try {
      const accessToken = await TokenRegister.getAccessToken();
      await this.props.signOut({
        token: accessToken,
        deferred: true,
      });

      await TokenRegister.removeToken();
      await this.props.navigation.navigate('Auth');
    } catch (e) {
      console.log(e);
      alert('Error!');
    }
  }

  componentDidMount() {
    super.componentDidMount();
    this.props.navigation.setParams({ handleSignOut: () => this.logout() })
    api.get('/api/profile', {
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
    const avatar = getThumbnail(thumbnails.usersM, this.state.image);
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
            <Text style={{fontSize: 16}}>{
              this.state.profile.name ?
                this.state.profile.name :
                (this.state.profile.login ? this.state.profile.login : 'Unknown')
            }</Text>
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
        <InfoText text="Account"/>
        <View>
          {/*<ListItem*/}
          {/*  hideChevron*/}
          {/*  title="Push Notifications"*/}
          {/*  containerStyle={styles.listItemContainer}*/}
          {/*  rightElement={*/}
          {/*    <Switch*/}
          {/*      // onValueChange={this.onChangePushNotifications}*/}
          {/*      value={false}*/}
          {/*    />*/}
          {/*  }*/}
          {/*  leftIcon={*/}
          {/*    <BaseIcon*/}
          {/*      containerStyle={{*/}
          {/*        backgroundColor: '#FFADF2',*/}
          {/*      }}*/}
          {/*      icon={{*/}
          {/*        type: 'material',*/}
          {/*        name: 'notifications',*/}
          {/*      }}*/}
          {/*    />*/}
          {/*  }*/}
          {/*/>*/}
          {/*<ListItem*/}
          {/*  // chevron*/}
          {/*  title="Currency"*/}
          {/*  rightTitle="USD"*/}
          {/*  rightTitleStyle={{fontSize: 15}}*/}
          {/*  // onPress={() => this.onPressOptions()}*/}
          {/*  containerStyle={styles.listItemContainer}*/}
          {/*  leftIcon={*/}
          {/*    <BaseIcon*/}
          {/*      containerStyle={{backgroundColor: '#FAD291'}}*/}
          {/*      icon={{*/}
          {/*        type: 'font-awesome',*/}
          {/*        name: 'money',*/}
          {/*      }}*/}
          {/*    />*/}
          {/*  }*/}
          {/*  rightIcon={<Chevron/>}*/}
          {/*/>*/}
          {/*<ListItem*/}
          {/*  title="Location"*/}
          {/*  rightTitle="New York"*/}
          {/*  rightTitleStyle={{fontSize: 15}}*/}
          {/*  // onPress={() => this.onPressOptions()}*/}
          {/*  containerStyle={styles.listItemContainer}*/}
          {/*  leftIcon={*/}
          {/*    <BaseIcon*/}
          {/*      containerStyle={{backgroundColor: '#57DCE7'}}*/}
          {/*      icon={{*/}
          {/*        type: 'material',*/}
          {/*        name: 'place',*/}
          {/*      }}*/}
          {/*    />*/}
          {/*  }*/}
          {/*  rightIcon={<Chevron/>}*/}
          {/*/>*/}
          <ListItem
            title="Language"
            rightTitle="English"
            rightTitleStyle={{fontSize: 15}}
            // onPress={() => this.onPressOptions()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{backgroundColor: '#FEA8A1'}}
                icon={{
                  type: 'material',
                  name: 'language',
                }}
              />
            }
            rightIcon={<Chevron/>}
          />
        </View>
      </ScrollView>
    )
  }

}

export default connect(
  Profile.mapStateToProps,
  Profile.mapDispatchToProps,
)(Profile);
