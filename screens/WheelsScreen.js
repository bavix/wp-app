import React from 'react';
import { Text, ActivityIndicator, StyleSheet } from 'react-native';
import { View, FlatList } from 'react-native';
import Colors from '../constants/Colors';
import api from '../kit/api';
import { Image, Divider, Icon } from 'react-native-elements';

export default class WheelsScreen extends React.PureComponent {

  static navigationOptions = {
    title: 'Wheels',
    headerRight: (
      <Icon
        containerStyle={{paddingRight: 15}}
        name='ios-options'
        type='ionicon'
        size={26}
        color={Colors.tintColor}
        onPress={() => alert('Hello, ReactNative!')} />
    ),
  };

  state = {
    url: '/api/wheels?include=image,brand&page=',
    page: 1,
    loading: false,
    dataSource: [],
  };

  componentDidMount() {
    this.handleLoadMore()
  }

  loadingComponent = () => {
    if (this.state.loading) {
      return <View style={{ paddingVertical: 20 }} >
        <ActivityIndicator animating size='large' />
      </View>
    }

    return null;
  };

  handleLoadMore = () => {
    if (!this.state.loading && this.state.page) {
      this.setState({ loading: true });
      api.get(`${this.state.url}${this.state.page}`)
        .then(res => {
          let page = null
          if (this.state.page < res.data.meta.last_page) {
            page = this.state.page + 1
          }

          const dataSource = this.state.dataSource;
          for (const item of res.data.data) {
            const index = dataSource.findIndex(datum => datum.id === item.id);
            if (index === -1) {
              dataSource.push(item)
            }
          }

          this.setState({
            loading: false,
            dataSource,
            page,
          })
        })
        .catch(err => {
          this.setState({ loading: false });
        })
    }
  };

  renderItem = ({item}) => {
    return <View>
      <View style={styles.titleContainer}>
        <View style={styles.titleIconContainer}>
          <Image
            source={{ uri: `https://cdn.wheelpro.ru/wheel/thumbs/${item.image.uuid}/default.png` }}
            style={{ width: 176, height: 176 }}
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
      <View style={{paddingLeft: 14, paddingRight: 14}}>
        <Text>Like: {item.likes_count}; Favorites: {item.favorites_count}</Text>
      </View>
      <Divider style={{backgroundColor: Colors.tintColor}} />
    </View>
  };

  render() {
    return (
      <FlatList data={this.state.dataSource}
        extraData={this.state}
        keyExtractor={(item, index) => item.id.toString()}
        ListFooterComponent={this.loadingComponent}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={3}
        renderItem={this.renderItem}
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
