import React from 'react';
import { Text, Button, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { View, FlatList } from 'react-native';
import Colors from '../constants/Colors';
import api from '../kit/api';
import { Image, Divider, Icon } from 'react-native-elements';

export default class WheelsScreen extends React.Component {

  static navigationOptions = {
    title: 'Wheels',
    headerRight: (
      <Icon
        raised
        name='quote-right'
        // type='font-awesome'
        color={Colors.tintColor}
        onPress={() => alert('Hello, ReactNative!')} />
    ),
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
      <ScrollView>
        {!this.state.dataSource.length && <ActivityIndicator size='large' />}
        <FlatList data={this.state.dataSource}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) =>
            <View>
              <View style={styles.titleContainer}>
                <View style={styles.titleIconContainer}>
                  <Image
                    source={{ uri: `https://cdn.wheelpro.ru/wheel/thumbs/${item.image.uuid}/default.png` }}
                    style={{ width: 160, height: 160 }}
                    PlaceholderContent={<ActivityIndicator />}
                    placeholderStyle={{backgroundColor: 'white'}}
                    resizeMode='contain'
                  />
                </View>

                <View>
                  <View>
                    <Text style={styles.nameText}>
                      {item.name}
                    </Text>

                    <Text style={styles.slugText}>
                      {item.brand.name}
                    </Text>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Text style={{flexWrap: 'wrap'}}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                      dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                      aliquip ex ea commodo consequat.
                    </Text>
                  </View>

                </View>
              </View>
              <View>
                <Text>Like: {item.likes_count}, Favorites: {item.favorites_count}</Text>
              </View>
              <Divider />
            </View>
          }
          keyExtractor={item => item.id}
        />
      </ScrollView>
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
    fontSize: 22,
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
  }
});
