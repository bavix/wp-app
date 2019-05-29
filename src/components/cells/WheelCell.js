import React from 'react'
import {ActivityIndicator, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {Button, Divider, Icon, Image} from 'react-native-elements/src/index';
import Colors from '../../../constants/Colors';
import {ICON_PREFIX} from "../TabBarIcon";

/**
 * @deprecated
 */
export default class extends React.PureComponent {

  state = {
    favoriteLoad: false,
    likeLoad: false,
  };

  /**
   * @deprecated
   */
  render() {
    const {item} = this.props;
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
                  <Text style={styles.title}>{item.name}</Text>
                  <Button
                    style={{
                      position: 'absolute',
                      right: 0,
                      zIndex: 5,
                    }}
                    loading={this.state.favoriteLoad}
                    disabled={this.state.favoriteLoad}
                    type="clear"
                    icon={
                      <Icon
                        name={ICON_PREFIX + 'star'}
                        type='ionicon'
                        color={item.favorited ? Colors.cellFavorited : Colors.cellFavoriteIt}
                      />
                    }
                    onPress={() => {
                      this.setState({favoriteLoad: true}, async () => {
                        await this.props.favoritePress().finally(() => {
                          this.setState({favoriteLoad: false});
                        })
                      });
                    }}
                  />
                </View>
                <Text style={styles.subtitle}>{item.brand.name}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.wrap}>
                  ADV.1 produces premiere custom-made one-piece, two-piece and three-piece forged aluminum and carbon
                  fiber wheels ...
                </Text>
              </View>
            </View>
          </View>

        </TouchableWithoutFeedback>

        <View style={[styles.row, styles.cellFooter]}>
          <Button
            loading={this.state.likeLoad}
            disabled={this.state.likeLoad}
            type="clear"
            icon={
              <Icon
                name={ICON_PREFIX + 'heart'}
                type='ionicon'
                color={item.liked ? Colors.cellLiked : Colors.cellLikeIt}/>
            }
            title={item.likes_count.toString()}
            titleStyle={styles.btnLike}
            onPress={() => {
              this.setState({likeLoad: true}, async () => {
                await this.props.likePress().finally(() => {
                  this.setState({likeLoad: false});
                })
              });
            }}
          />

          <Button
            type="clear"
            icon={
              <Icon
                name={ICON_PREFIX + 'chatbubbles'}
                type='ionicon'
                color={Colors.tabIconDefault}/>
            }
            title={item.comments_count.toString()}
            titleStyle={styles.btnLike}
            onPress={() => alert(`ID: ${item.id}`)}
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
    alignItems: 'center',
    paddingLeft: 5,
    color: Colors.tintColor,
  },
});
