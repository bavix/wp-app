import React, {PureComponent} from 'react'
import TimedSlideshow from 'react-native-timed-slideshow'

class WheelsTour extends PureComponent {

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Wheels Tour',
    }
  };

  render() {
    const items = [
      {
        uri: "http://www.lovethemountains.co.uk/wp-content/uploads/2017/05/New-Outdoor-Sports-and-Music-Festival-For-Wales-4.jpg",
        title: "Michael Malik",
        text: "Minnesota, USA",
      },
      {
        uri: "http://blog.adrenaline-hunter.com/wp-content/uploads/2018/05/bungee-jumping-barcelona-1680x980.jpg",
        title: "Victor Fallon",
        text: "Val di Sole, Italy",
        duration: 3000
      },
      {
        uri: "https://greatist.com/sites/default/files/Running_Mountain.jpg",
        title: "Mary Gomes",
        text: "Alps",
        fullWidth: true
      }
    ];

    return (
      <TimedSlideshow
        items={items}
      />
    );
  }

}

export default WheelsTour;
