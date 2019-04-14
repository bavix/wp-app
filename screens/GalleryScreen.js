import React from 'react';
import {View, Text} from 'react-native';
import Gallery from 'react-native-gallery-swiper';
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

export default class GalleryScreen extends React.PureComponent {

  static navigationOptions = {
    title: 'Gallery'
  };

  render() {
    return <ImageView
      images={images}
      imageIndex={0}
      isVisible={this.props.visiable}
      renderFooter={(currentImage) => (<View><Text>My footer</Text></View>)}
    />
    // return <Gallery
    //   style={{flex: 1, backgroundColor: 'black'}}
    //   images={[
    //     {uri: 'http://i.imgur.com/5nltiUd.jpg'},
    //     {uri: 'http://i.imgur.com/6vOahbP.jpg'},
    //     {uri: 'http://i.imgur.com/XP2BE7q.jpg'},
    //     {uri: 'http://i.imgur.com/6vOahbP.jpg'},
    //     {uri: 'http://i.imgur.com/5nltiUd.jpg'},
    //     {uri: 'http://i.imgur.com/XP2BE7q.jpg'},
    //     {uri: 'http://i.imgur.com/6vOahbP.jpg'},
    //     {uri: 'http://i.imgur.com/kj5VXtG.jpg'},
    //     {uri: 'http://i.imgur.com/5nltiUd.jpg'},
    //     {uri: 'http://i.imgur.com/6vOahbP.jpg'},
    //     {uri: 'http://i.imgur.com/XP2BE7q.jpg'},
    //     {uri: 'http://i.imgur.com/6vOahbP.jpg'},
    //     {uri: 'http://i.imgur.com/5nltiUd.jpg'},
    //     {uri: 'http://i.imgur.com/XP2BE7q.jpg'},
    //     {uri: 'http://i.imgur.com/6vOahbP.jpg'},
    //     {uri: 'http://i.imgur.com/kj5VXtG.jpg'}
    //   ]}
    //   initialNumToRender={2}
    //   sensitiveScroll={false}
    // />
  }
}
