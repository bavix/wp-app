import React, {PureComponent} from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import {
  Icon as BaseIcon,
  Icon as Chevron,
  ListItem,
  Text as InfoText
} from "react-native-elements/src/index"

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

  render() {
    return (
      <ScrollView style={styles.scroll}>

        {/*<InfoText text="More"/>*/}
        <View>
          <ListItem
            title="About US"
            // onPress={() => this.onPressOptions()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{backgroundColor: '#A4C8F0'}}
                icon={{
                  type: 'ionicon',
                  name: 'md-information-circle',
                }}
              />
            }
            rightIcon={<Chevron/>}
          />
          <ListItem
            title="Terms and Policies"
            // onPress={() => this.onPressOptions()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{backgroundColor: '#C6C7C6'}}
                icon={{
                  type: 'entypo',
                  name: 'light-bulb',
                }}
              />
            }
            rightIcon={<Chevron/>}
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
            rightIcon={<Chevron/>}
          />
          <ListItem
            title="Rate Us"
            // onPress={() => this.onPressOptions()}
            containerStyle={styles.listItemContainer}
            badge={{
              value: 5,
              textStyle: {color: 'white'},
              containerStyle: {backgroundColor: 'gray', marginTop: 0},
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
            rightIcon={<Chevron/>}
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
            rightIcon={<Chevron/>}
          />
        </View>
      </ScrollView>
    )
  }

}

export default Info;
