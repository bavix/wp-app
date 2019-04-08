import React from 'react';
import { Text, Button, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { View, FlatList } from 'react-native';
import Colors from '../constants/Colors'

export default class WheelsScreen extends React.Component {

  static navigationOptions = {
    title: 'Wheels',
    headerRight: (
      <Button
        onPress={() => alert('Hello, ReactNative!')}
        title="Info"
        color={Colors.tintColor}
      />
    ),
  };

  state = {
    dataSource: [
      {
        "id": 2,
        "name": "CV3-R",
        "brand_id": 1,
        "collection_id": 1,
        "style_id": 85,
        "image_id": 125,
        "popular": 20869,
        "customized": false,
        "enabled": true,
        "retired": false,
        "created_at": "2019-02-12 19:27:47",
        "updated_at": "2019-02-12 19:27:47",
        "likes_count": 9,
        "favorites_count": 11
      },
      {
        "id": 1,
        "name": "CVT",
        "brand_id": 1,
        "collection_id": 1,
        "style_id": 152,
        "image_id": 124,
        "popular": 17600,
        "customized": false,
        "enabled": true,
        "retired": false,
        "created_at": "2019-02-12 19:27:46",
        "updated_at": "2019-02-12 19:27:46",
        "likes_count": 7,
        "favorites_count": 10
      },
      {
        "id": 6,
        "name": "VFS/1",
        "brand_id": 1,
        "collection_id": 2,
        "style_id": 187,
        "image_id": 129,
        "popular": 13647,
        "customized": false,
        "enabled": true,
        "retired": false,
        "created_at": "2019-02-12 19:27:47",
        "updated_at": "2019-02-12 19:27:47",
        "likes_count": 7,
        "favorites_count": 6
      }
    ]
  };

  render() {
    return (
      <FlatList style={styles.constructor}
        data={this.state.dataSource}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) =>
          <View style={styles.flatView}>
            <Text style={styles.name}>{item.name}</Text>
          </View>
        }
        keyExtractor={item => item.id}
      />
    );

    return (
      <ScrollView style={styles.container}>
        {/*{!this.state.items.length && <ActivityIndicator size="small" color={Colors.tintColor} />}*/}
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
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
