import React from 'react';
import {View, ScrollView} from 'react-native';
import {Text, Tile} from 'react-native-elements';
import ImageView from 'react-native-image-view';

const images = [
  {
    source: {
      uri: 'https://cdn.pixabay.com/photo/2017/08/17/10/47/paris-2650808_960_720.jpg',
    },
  },
  {
    source: {
      uri: 'https://cdn.pixabay.com/photo/2017/08/17/10/47/paris-2650808_960_720.jpg',
    },
  },
  {
    source: {
      uri: 'https://cdn.pixabay.com/photo/2017/08/17/10/47/paris-2650808_960_720.jpg',
    },
  },
  {
    source: {
      uri: 'https://cdn.pixabay.com/photo/2017/08/17/10/47/paris-2650808_960_720.jpg',
    },
  },
  {
    source: {
      uri: 'https://cdn.pixabay.com/photo/2017/08/17/10/47/paris-2650808_960_720.jpg',
    },
  },
];

export default class DetailScreen extends React.PureComponent {

  static navigationOptions = {
    title: 'Wheel Detail',
  };

  state = {
    modal: false
  };

  render() {
    const {navigation} = this.props;

    return (
      <ScrollView>
        <ImageView
          images={images}
          imageIndex={0}
          isVisible={this.state.modal}
          renderFooter={(currentImage) => (<View><Text>My footer</Text></View>)}
        />
        <Tile
          imageSrc={navigation.getParam('image')}
          featured
          onPress={() => this.setState({ modal: true })}
        />
        <Text h1>{navigation.getParam('item').name}</Text>
        <Text h4>{navigation.getParam('item').brand.name}</Text>
      </ScrollView>
    );
  }

}
