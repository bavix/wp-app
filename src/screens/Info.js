import React, {PureComponent} from 'react'
import {ScrollView, StyleSheet, View, Alert} from 'react-native'
import {
  Icon,
  Icon as Chevron,
  ListItem,
} from "react-native-elements/src/index"
import {ICON_PREFIX} from "../components/TabBarIcon";

import email from 'react-native-email'
import {Linking} from "expo";

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

class Info extends PureComponent {

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Info',
    }
  };

  static sendEmail() {
    return email(['feedback@wheelpro.ru']).catch(() => {
      Alert.alert('Sending email is not supported...', 'Contact us manually: feedback@wheelpro.ru')
    })
  }

  static gotoInstagram() {
    return Linking.openURL('https://www.instagram.com/whlpro/').catch(() => {
      Alert.alert('Opening a browser is not supported....', 'Open manually: https://www.instagram.com/whlpro/')
    })
  }

  render() {
    return (
      <ScrollView style={styles.scroll}>

        <View>
          <ListItem
            title="FeedBack"
            onPress={() => Info.sendEmail()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <Icon
                type='ionicon'
                name={ICON_PREFIX + 'send'}
              />
            }
            rightIcon={
              <Icon type='ionicon' name={ICON_PREFIX + 'arrow-dropright'} />
            }
          />
          <ListItem
            title="Instagram"
            onPress={() => Info.gotoInstagram()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <Icon
                type='ionicon'
                name={'logo-instagram'}
              />
            }
            rightIcon={
              <Icon type='ionicon' name={ICON_PREFIX + 'arrow-dropright'} />
            }
          />
        </View>
      </ScrollView>
    )
  }

}

export default Info;
