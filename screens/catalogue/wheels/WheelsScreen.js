import React from 'react';
import {ActivityIndicator} from 'react-native';
import {View, FlatList} from 'react-native';
import Colors from '../../../constants/Colors';
import api from '../../../helpers/Api';
import concat from '../../../helpers/Concat';
import {Icon} from 'react-native-elements';
import WheelCell from '../../../components/cells/WheelCell'
import {ICON_PREFIX} from '../../../components/TabBarIcon'

export default class WheelsScreen extends React.PureComponent {

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Wheels',
      headerRight: (
        <Icon
          containerStyle={{paddingRight: 15}}
          name={ICON_PREFIX + 'options'}
          type='ionicon'
          size={26}
          color={Colors.tintColor}
          onPress={() => alert('Hello World!')}/>
      ),
    }
  };

  state = {
    include: 'image,brand',
    path: '/api/wheels',
    loading: false,
    refresh: false,
    dataSource: [],
    filter: [],
    page: 1,
  };

  componentDidMount() {
    this.handleLoadMore()
  }

  loadingComponent = () => {
    if (this.state.loading && !this.state.refresh) {
      return <View style={{paddingVertical: 20}}>
        <ActivityIndicator animating size='large'/>
      </View>
    }

    return null;
  };

  handleRefresh = () => {
    if (this.state.refresh) {
      return;
    }

    this.setState({refresh: true, page: 1}, this.handleLoadMore);
  };

  handleLoadMore = () => {
    if (this.state.loading || !this.state.page) {
      return;
    }

    this.setState({loading: true}, () => {

      api.get(this.state.path, {
        params: {
          include: this.state.include,
          filter: this.state.filter,
          page: this.state.page,
        }
      })
        .then(res => res.data)
        .then(({data, meta}) => {
          let page = null;
          if (this.state.page < meta.last_page) {
            page = this.state.page + 1
          }

          let dataSource = data;
          if (!this.state.refresh) {
            dataSource = concat(this.state.dataSource, data);
          }

          this.setState({
            loading: false,
            refresh: false,
            dataSource,
            page,
          })
        })
        .catch(err => {
          this.setState({loading: false, refresh: false});
        })

    });
  };

  getImage = (item, type) => {
    if (item.image) {
      return {
        uri: `https://cdn.wheelpro.ru/wheel/${type}/${item.image.uuid}/default.png`
      }
    }

    return require('../../../assets/images/wheels/placeholder.png');
  };

  renderItem = ({item}) => {
    return <WheelCell
      title={item.name}
      subtitle={item.brand.name}
      likes={item.likes_count}
      favorites={item.favorites_count}
      imageSource={this.getImage(item, 'thumbs')}
      pressItem={() => this.props.navigation.navigate('WheelDetailScreen', {
        item,
        image: this.getImage(item, 'normal')
      })}
    />
  };

  render() {
    return (
      <FlatList
        extraData={this.state}
        data={this.state.dataSource}
        keyExtractor={(item, index) => item.id.toString()}
        ListFooterComponent={this.loadingComponent}
        onEndReached={this.handleLoadMore}
        renderItem={this.renderItem}
        onEndReachedThreshold={3}
        onRefresh={this.handleRefresh}
        refreshing={this.state.refresh}
      />
    );
  }

}
