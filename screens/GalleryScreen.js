import React from 'react';
import Gallery from 'react-native-gallery-swiper';

export default class GalleryScreen extends React.PureComponent {

  static navigationOptions = {
    title: 'Gallery'
  }

  render() {
    return <Gallery
      style={{ flex: 1, backgroundColor: 'black' }}
      images={[
        { uri: 'http://i.imgur.com/5nltiUd.jpg' },
        { uri: 'http://i.imgur.com/6vOahbP.jpg' },
        { uri: 'http://i.imgur.com/XP2BE7q.jpg' },
        { uri: 'http://i.imgur.com/6vOahbP.jpg' },
        { uri: 'http://i.imgur.com/5nltiUd.jpg' },
        { uri: 'http://i.imgur.com/XP2BE7q.jpg' },
        { uri: 'http://i.imgur.com/6vOahbP.jpg' },
        { uri: 'http://i.imgur.com/kj5VXtG.jpg' },
        { uri: 'http://i.imgur.com/5nltiUd.jpg' },
        { uri: 'http://i.imgur.com/6vOahbP.jpg' },
        { uri: 'http://i.imgur.com/XP2BE7q.jpg' },
        { uri: 'http://i.imgur.com/6vOahbP.jpg' },
        { uri: 'http://i.imgur.com/5nltiUd.jpg' },
        { uri: 'http://i.imgur.com/XP2BE7q.jpg' },
        { uri: 'http://i.imgur.com/6vOahbP.jpg' },
        { uri: 'http://i.imgur.com/kj5VXtG.jpg' }
      ]}
      initialNumToRender={2}
      sensitiveScroll={false}
    />
  }
}
