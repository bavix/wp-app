import React from 'react';
import {ScrollView} from 'react-native';
import {Text, Tile} from 'react-native-elements';

export default class DetailScreen extends React.Component {

  static navigationOptions = {
    title: 'Wheel Detail',
  };

  render() {
    const {navigation} = this.props;

    return (
      <ScrollView>
        <Tile
          imageSrc={navigation.getParam('image')}
          featured
          onPress={() => navigation.push('GalleryScreen')}
        />
        <Text h1>{navigation.getParam('item').name}</Text>
        <Text h4>{navigation.getParam('item').brand.name}</Text>
      </ScrollView>
    );
  }

}
