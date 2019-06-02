import React from 'react'
import Colors from '../../../../constants/Colors';
import {Icon} from 'react-native-elements/src/index';
import WheelCell from '../../../components/cells/WheelCell'
import TableView from "../../../components/TableView";
import {ICON_PREFIX} from "../../../components/TabBarIcon";
import CDN, {BUCKET_WHEELS, VIEW_WHEELS_M, VIEW_WHEELS_XS,} from "../../../../helpers/CDN";
import api from '../../../helpers/api'
import {AsyncStorage} from "react-native"

export default class List extends React.PureComponent {

  /**
   * @param navigation
   * @return {{headerRight: *, title: string}}
   */
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
          onPress={async () => {
            await AsyncStorage.clear();
            alert('Hello World!')
          }}/>
      ),
    }
  };

  state = {
    apiUrl: '/api/wheels',
    apiParams: {
      include: ['image', 'brand'],
    }
  };

  favorite = async (item) => {
    if (item.favorited) {
      return await api.delete(`/api/wheels/${item.id}/favorite`).then(() => {
        item.favorites_count = item.favorites_count - 1;
        item.favorited = false;
      });
    }

    await api.post(`/api/wheels/${item.id}/favorite`).then((res) => {
      item.favorites_count = res.data.count;
      item.favorited = true;
    });
  };

  like = async (item) => {
    if (item.liked) {
      return await api.delete(`/api/wheels/${item.id}/like`).then(() => {
        item.likes_count = item.likes_count - 1;
        item.liked = false;
      });
    }

    await api.post(`/api/wheels/${item.id}/like`).then((res) => {
      item.likes_count = res.data.count;
      item.liked = true;
    });
  };

  /**
   * @param item
   * @return {*}
   */
  renderItem = (item) => {
    return <WheelCell
      id={item.id}
      item={item}
      imageSource={CDN.getThumbnail(BUCKET_WHEELS, VIEW_WHEELS_XS, item.image)}
      defaultSource={CDN.getPlaceholder(BUCKET_WHEELS)}
      favoritePress={async () => await this.favorite(item)}
      likePress={async () => await this.like(item)}
      pressItem={() => this.props.navigation.navigate('WheelDetailScreen', {
        item,
        image: CDN.getThumbnail(BUCKET_WHEELS, VIEW_WHEELS_M, item.image),
      })}
    />
  };

  /**
   * @return {*}
   */
  render() {
    return (
      <TableView
        apiUrl={this.state.apiUrl}
        apiParams={this.state.apiParams}
        renderItem={({item}) => this.renderItem(item)}
        onEndReachedThreshold={3}/>
    );
  }

}
