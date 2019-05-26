import React from 'react'
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native';
import {Button, Divider, Icon, Image} from 'react-native-elements';
import Colors from '../../constants/Colors';
import {ICON_PREFIX} from "../TabBarIcon";
import CDN, {BUCKET_WHEELS} from "../../helpers/CDN";

export default class extends React.PureComponent {

  render() {
    return (
      <View style={styles.cell}>

        <TouchableWithoutFeedback onPress={this.props.pressItem}>

          <View style={[styles.row, styles.cellBody]}>
            <View style={styles.cellImage}>
              <Image
                source={this.props.imageSource}
                defaultSource={this.props.defaultSource}
                style={styles.cellImageSize}
                PlaceholderContent={<ActivityIndicator/>}
                placeholderStyle={{backgroundColor: 'white'}}
                resizeMode='contain'
              />
            </View>

            <View style={styles.meta}>
              <View>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>{this.props.title}</Text>
                  <Icon
                    name={ICON_PREFIX + 'star'}
                    type='ionicon'
                    color={this.props.favorited ? Colors.cellFavorited : Colors.cellFavoriteIt}
                    onPress={() => alert(`ID: ${this.props.id}`)}/>
                </View>
                <Text style={styles.subtitle}>{this.props.subtitle}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.wrap}>
                  ADV.1 produces premiere custom-made one-piece, two-piece and three-piece forged aluminum and carbon fiber wheels ...
                </Text>
              </View>
            </View>
          </View>

        </TouchableWithoutFeedback>

        <View style={[styles.row, styles.cellFooter]}>
          <Button
            type="clear"
            icon={
              <Icon
                name={ICON_PREFIX + 'heart'}
                type='ionicon'
                color={this.props.liked ? Colors.cellLiked : Colors.cellLikeIt} />
            }
            title={this.props.likes.toString()}
            titleStyle={styles.btnLike}
            onPress={() => alert(`ID: ${this.props.id}`)}
          />

          <Button
            type="clear"
            icon={
              <Icon
                name={ICON_PREFIX + 'chatbubbles'}
                type='ionicon'
                color={Colors.tabIconDefault} />
            }
            title={this.props.comments.toString()}
            titleStyle={styles.btnLike}
            onPress={() => alert(`ID: ${this.props.id}`)}
          />
        </View>

        <Divider style={styles.divider}/>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  cell: {
    paddingTop: 5,
    paddingBottom: 5,
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
  },
  cellImageSize: {
    width: 160,
    height: 160,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
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
  btnLike: {
    justifyContent: 'center',
    alignItems:'center',
    paddingLeft: 5,
    color: Colors.tintColor,
  },
});
