import React from 'react'
import Colors from '../../../../constants/Colors';
import {Divider, Icon} from 'react-native-elements/src/index';
import WheelCell from '../../../components/cells/WheelCell'
import TableView from "../../../components/TableView";
import {ICON_PREFIX} from "../../../components/TabBarIcon";
import api from '../../../helpers/api'
import {AsyncStorage, View} from "react-native"
import Modalize from 'react-native-modalize'
import {Text, Button, Card} from 'react-native-elements'
import PickerModal from 'react-native-picker-modal-view';
import {getPlaceholder, getThumbnail} from "../../../helpers/cdn";
import {buckets, thumbnails} from "../../../constants";

const list = [
  {Id: 1, Name: 'Test1 Name', Value: 'Test1 Value'},
  {Id: 2, Name: 'Test2 Name', Value: 'Test2 Value'},
  {Id: 3, Name: 'Test3 Name', Value: 'Test3 Value'},
  {Id: 4, Name: 'Test4 Name', Value: 'Test4 Value'}
]

export default class List extends React.PureComponent {

  /**
   * @param navigation
   * @return {{headerRight: *, title: string}}
   */
  static navigationOptions = ({navigation}) => {
    const {state} = navigation;
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
            state.params.handleModal();
            // alert('Hello World!')
          }}/>
      ),
    }
  };

  modal = React.createRef();

  onOpen = () => {
    if (this.modal.current) {
      this.modal.current.open();
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ handleModal: () => this.onOpen() })
  }

  state = {
    selectedItem: {},
    apiUrl: '/api/wheels',
    apiParams: {
      include: ['image', 'brand'],
      filter: [],
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
      imageSource={getThumbnail(thumbnails.wheelsXs, item.image)}
      defaultSource={getPlaceholder(buckets.wheels)}
      favoritePress={async () => await this.favorite(item)}
      likePress={async () => await this.like(item)}
      pressItem={() => this.props.navigation.navigate('WheelDetailScreen', {
        item,
        image: getThumbnail(thumbnails.wheelsM, item.image),
      })}
    />
  };

  onClosed() {
    console.log('close key pressed');
  }

  onSelected(selected) {
    this.setState({ selectedItem: selected });
    return selected;
  }

  onBackButtonPressed() {
    console.log('back key pressed');
  }

  /**
   * @return {*}
   */
  render() {
    return (
      <View>
        <Modalize ref={this.modal} adjustToContentHeight={true}>
          <View style={{padding: 15}}>
            <Text style={{marginBottom: 10}}>
              The idea with React Native Elements is more about component structure than actual design.
            </Text>

            <PickerModal
              // renderSelectView={(disabled, selected, showModal) =>
              //   <Button disabled={disabled} title={'Show me!'} onPress={showModal} />
              // }
              onSelected={this.onSelected.bind(this)}
              onClosed={this.onClosed.bind(this)}
              onBackButtonPressed={this.onBackButtonPressed.bind(this)}
              items={list}
              // sortingLanguage={'tr'}
              // showToTopButton={true}
              selected={this.state.selectedItem}
              autoGenerateAlphabeticalIndex={true}
              selectPlaceholderText={'Choose brand...'}
              onEndReached={() => console.log('list ended...')}
              searchPlaceholderText={'Search...'}
              requireSelection={false}
              autoSort={false}
            />

            <Button
              buttonStyle={{backgroundColor: '#000'}}
              title='Apply' />
          </View>
        </Modalize>

        <TableView
          apiUrl={this.state.apiUrl}
          apiParams={this.state.apiParams}
          renderItem={({item}) => this.renderItem(item)}
          onEndReachedThreshold={3}/>
      </View>
    );
  }

}
