import React from 'react';
import Colors from '../../../constants/Colors';
import {Icon, Image} from 'react-native-elements';
import WheelCell from '../../../components/cells/WheelCell'
import TableView from "../../../components/TableView";
import {ICON_PREFIX} from "../../../components/TabBarIcon";
import CDN, {
  BUCKET_WHEELS,
  VIEW_WHEELS_XS,
  VIEW_WHEELS_M,
} from "../../../helpers/CDN";

export default class WheelsScreen extends React.PureComponent {

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
          onPress={() => alert('Hello World!')}/>
      ),
    }
  };

  state = {
    apiUrl: '/api/wheels',
    apiParams: {
      include: ['image', 'brand'],
    }
  };

  /**
   * @param item
   * @return {*}
   */
  renderItem = (item) => {
    return <WheelCell
      id={item.id}
      title={item.name}
      subtitle={item.brand.name}
      comments={item.comments_count}
      likes={item.likes_count}
      liked={item.liked}
      favorites={item.favorites_count}
      favorited={item.favorited}
      imageSource={CDN.getThumbnail(BUCKET_WHEELS, VIEW_WHEELS_XS, item.image)}
      defaultSource={CDN.getPlaceholder(BUCKET_WHEELS)}
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
        onEndReachedThreshold={3} />
    );
  }

}
