import React from 'react';
import {View, ScrollView} from 'react-native';
import {Text, Tile} from 'react-native-elements';
import GalleryScreen from "../../GalleryScreen";

export default class DetailScreen extends React.Component {

  static navigationOptions = {
    title: 'Wheel Detail',
  };

  state = {
    modal: false
  }

  render() {
    const {navigation} = this.props;

    return (
      <ScrollView>
        <GalleryScreen visiable={this.state.modal} />
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
