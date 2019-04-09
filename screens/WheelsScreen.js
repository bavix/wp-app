import React from 'react';
import {Text, Button, ActivityIndicator, ScrollView, StyleSheet, Image} from 'react-native';
import { View, FlatList } from 'react-native';
import Colors from '../constants/Colors';
import { Icon } from 'expo';
import api from '../kit/api';

export default class WheelsScreen extends React.Component {

  static navigationOptions = {
    title: 'Wheels',
    // headerRight: (
    //   <Button
    //     onPress={() => alert('Hello, ReactNative!')}
    //     // title="Info"
    //     color={Colors.tintColor}
    //   >
    //     <Icon
    //       name="quote-right"
    //       backgroundColor="transparent"
    //       underlayColor="transparent"
    //       color="black"
    //       onPress={() => alert('Hello, ReactNative!')}
    //     >
    //       <Text style={{fontSize: 15}} />
    //     </Icon>
    //   </Button>
    // ),
  };

  state = {
    dataSource: []
  };

  componentDidMount() {
    fetch('https://wp.babichev.net/api/wheels?include=image,brand')
      .then(res => res.json())
      .then(res => this.setState({ dataSource: res.data }))
      .catch(console.log)
  }

  render() {
    return (
      <FlatList style={styles.constructor}
        data={this.state.dataSource}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) =>
          <View style={styles.titleContainer}>
            <View style={styles.titleIconContainer}>
              <Image
                source={{ uri: 'https://s3.amazonaws.com/exp-brand-assets/ExponentEmptyManifest_192.png' }}
                style={{ width: 128, height: 128 }}
                resizeMode='cover'
              />
            </View>

            <View>
              <Text style={styles.nameText} numberOfLines={1}>
                {item.name}
              </Text>

              <Text style={styles.slugText} numberOfLines={1}>
                {item.brand.name}
              </Text>

              <Text style={styles.descriptionText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
              </Text>
            </View>
          </View>
        }
        keyExtractor={item => item.id}
      />
    );
  }

}

const styles = StyleSheet.create({
  titleContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
  },
  titleIconContainer: {
    marginRight: 15,
    paddingTop: 2,
  },
  nameText: {
    fontWeight: '600',
    fontSize: 18,
  },
  slugText: {
    color: '#a39f9f',
    fontSize: 14,
    backgroundColor: 'transparent',
  },
  descriptionText: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 14,
    color: '#4d4d4d',
  },

  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  flatView: {
    justifyContent: 'center',
    paddingTop: 30,
    borderRadius: 2,
    paddingRight: 10,
    paddingLeft: 10,
  },
  name: {
    fontFamily: 'Verdana',
    fontSize: 18
  }
});
