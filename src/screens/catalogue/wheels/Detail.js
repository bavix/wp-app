import React from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {Image, Text, Tile} from 'react-native-elements/src/index';
import TableView from "../../../components/TableView";
import {getThumbnail, getPlaceholder} from "../../../helpers/cdn";
import {buckets, thumbnails} from "../../../constants";

export default class Detail extends React.PureComponent {

  static navigationOptions = {
    title: 'Wheel Detail',
  };

  state = {
    apiUrl: '',
    apiParams: {
      include: ['image', 'brand'],
    }
  };

  componentDidMount() {
    const {navigation} = this.props;
    const {id} = navigation.getParam('item');
    this.setState({apiUrl: `/api/wheels/${id}/similar`});
  }

  render() {
    const {navigation} = this.props;

    return (
      <ScrollView>
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
            {/*<Text>We recommend you to pay attention</Text>*/}
          </View>

          <TableView
            horizontal
            apiUrl={this.state.apiUrl}
            apiParams={this.state.apiParams}
            onEndReachedThreshold={3}
            renderItem={({item: similar}) => {
              return (
                <TouchableWithoutFeedback onPress={() => this.props.navigation.push('WheelDetailScreen', {
                  item: similar,
                  image: getThumbnail(thumbnails.wheelsM, similar.image),
                })}>

                  <View style={{
                    overflow: 'hidden',
                    height: 160,
                    width: 160,
                    margin: 5,
                    borderRadius: 10,
                    borderColor: '#000',
                    borderStyle: 'solid',
                    borderWidth: 1,
                  }}>

                    <Image
                      style={{height: 160, width: 160,}}
                      resizeMode='contain'
                      source={getThumbnail(thumbnails.wheelsXs, similar.image)}
                      defaultSource={getPlaceholder(buckets.wheels)}
                      PlaceholderContent={<ActivityIndicator/>}>
                    </Image>

                    <View style={{
                      position: 'absolute',
                      bottom: 0,
                      width: '100%',
                      backgroundColor: '#ddd'
                    }}>

                      <Text style={{marginLeft: 10, marginRight: 10, fontWeight: 'bold'}}>{similar.brand.name}</Text>
                      <Text style={{marginLeft: 10, marginRight: 10}}>{similar.name}</Text>
                    </View>

                  </View>

                </TouchableWithoutFeedback>
              );
            }}
          />

        </View>

        <View>
          {/*<Text>More of what you like</Text>*/}
          {/*<Text>Auth block</Text>*/}
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
