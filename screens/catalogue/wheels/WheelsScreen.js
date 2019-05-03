import React from 'react';
import Colors from '../../../constants/Colors';
import {Icon} from 'react-native-elements';
import WheelCell from '../../../components/cells/WheelCell'
import TableView from "../../../components/TableView";
import {ICON_PREFIX} from "../../../components/TabBarIcon";

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
      include: 'image,brand',
    }
  };

  /**
   * @param item
   * @param type
   * @return {{uri: string}}
   */
  getImage = (item, type) => {
    if (item.image) {
      return {
        uri: item.image.thumbnails[type]
      }
    }

    return require('../../../assets/images/wheels/placeholder.png');
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
      likes={item.likes_count}
      liked={item.liked}
      favorites={item.favorites_count}
      favorited={item.favorited}
      imageSource={this.getImage(item, 'xs')}
      pressItem={() => this.props.navigation.navigate('WheelDetailScreen', {
        item,
        image: this.getImage(item, 'm'),
        getImage: this.getImage,
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
