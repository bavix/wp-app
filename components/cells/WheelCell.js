import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { Divider, Image } from 'react-native-elements';
import Colors from '../../constants/Colors';

export default class extends React.PureComponent {

  render() {
    return (
      <View style={styles.cell}>

        <TouchableWithoutFeedback onPress={this.props.pressItem}>

          <View style={[styles.row, styles.cellBody]}>
            <View style={styles.cellImage}>
              <Image
                source={this.props.imageSource}
                style={styles.cellImageSize}
                PlaceholderContent={<ActivityIndicator />}
                placeholderStyle={{backgroundColor: 'white'}}
                resizeMode='contain'
              />
            </View>

            <View style={styles.meta}>
              <View>
                <Text style={styles.title}>{this.props.title}</Text>
                <Text style={styles.subtitle}>{this.props.subtitle}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.wrap}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.
                </Text>
              </View>
            </View>
          </View>

        </TouchableWithoutFeedback>

        <View style={[styles.row, styles.cellFooter]}>
          <Text>Like: {this.props.likes}</Text>
          <Text>Favorites: {this.props.favorites}</Text>
        </View>

        <Divider style={styles.divider} />

      </View>
    );
  }

}

const styles = StyleSheet.create({
  cell: {
    paddingTop: 5,
    paddingBottom: 15,
  },
  cellImage: {
    marginRight: 15,
    paddingTop: 2,
  },
  cellBody: {
    paddingHorizontal: 15,
    paddingBottom: 5,
  },
  cellFooter: {
    paddingHorizontal: 15,
    backgroundColor: '#e2e2e2',
  },
  cellImageSize: {
    width: 160,
    height: 160,
  },
  row: {
    flexDirection: 'row',
  },
  wrap: {
    flex: 1,
    flexWrap: 'wrap',
  },
  divider: {
    backgroundColor: Colors.tintColor,
  },
  meta: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontWeight: '600',
    fontSize: 22,
  },
  subtitle: {
    color: '#a39f9f',
    fontSize: 14,
    backgroundColor: 'transparent',
  },
});
