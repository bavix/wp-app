import React from 'react';
import {View, ScrollView, StyleSheet, FlatList, ActivityIndicator, ImageBackground} from 'react-native';
import {Image, Text, Tile} from 'react-native-elements';
import ImageView from 'react-native-image-view';
import api from "../../../helpers/Api";

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
    modal: false,
    similar: [],
  };

  componentDidMount() {
    const {navigation} = this.props;
    const {id} = navigation.getParam('item');
    api.get(`/api/wheels/${id}/similar`, {
      params: {
        include: 'image,brand',
      }
    }).then(({data}) => data).then((data) => {
      const similar = this.state.similar
      similar.push(...data.data);
      this.setState({similar});
      console.log(similar);
    }).catch((e) => {
      // todo
      console.log(e)
    })
  }

  render() {
    const {navigation} = this.props;
    const getImage = navigation.getParam('getImage');

    return (
      <ScrollView>
        {/*<ImageView*/}
        {/*  images={images}*/}
        {/*  imageIndex={0}*/}
        {/*  isVisible={this.state.modal}*/}
        {/*  renderFooter={(currentImage) => (<View><Text>My footer</Text></View>)}*/}
        {/*/>*/}

        <Tile
          imageSrc={navigation.getParam('image')}
          featured
          // onPress={() => this.setState({ modal: true })}
        />

        <View style={styles.container}>
          <Text h1>{navigation.getParam('item').name}</Text>
          <Text h4>{navigation.getParam('item').brand.name}</Text>
        </View>

        <View>
          <View style={styles.container}>
            <Text>We recommend you to pay attention</Text>
          </View>

          <FlatList
            horizontal
            data={this.state.similar}
            renderItem={({ item: similar }) => {
              return (
                <ImageBackground
                  resizeMode='contain'
                  source={getImage(similar, 'thumbs')}
                  style={{
                    overflow: 'hidden',
                    height: 160,
                    width: 160,
                    margin: 5,
                    borderRadius: 10,
                    borderColor: '#000',
                    borderStyle: 'solid',
                    borderWidth: 1,
                  }}
                  PlaceholderContent={<ActivityIndicator />}>

                    <View style={{ backgroundColor: '#f0f0f0' }}>
                      <Text style={{ marginLeft: 10, marginRight: 10, fontWeight: 'bold' }}>{similar.brand.name}</Text>
                      <Text style={{ marginLeft: 10, marginRight: 10 }}>{similar.name}</Text>
                    </View>

                </ImageBackground>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />

        </View>

        <View>
          <Text>More of what you like</Text>
          <Text>Auth block</Text>
        </View>

      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
});
