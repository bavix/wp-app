import React from 'react';
import {ActivityIndicator} from 'react-native';
import {View, FlatList} from 'react-native';
import concat from '../helpers/Concat';
import api from '../helpers/Api';

export default class TableView extends React.PureComponent {

  state = {
    loading: false,
    refresh: false,
    dataSource: [],
    page: 1,
  };

  componentDidMount() {
    this.handleLoadMore()
  }

  loadingComponent = () => {
    if (this.state.loading && !this.state.refresh) {
      return <View style={{paddingVertical: 20}}>
        <ActivityIndicator animating size='large'/>
      </View>
    }

    return null;
  };

  handleRefresh = () => {
    if (this.state.refresh) {
      return;
    }

    this.setState({refresh: true, page: 1}, this.handleLoadMore);
  };

  handleLoadMore = () => {
    if (this.state.loading || !this.state.page) {
      return;
    }

    this.setState({loading: true}, () => {

      api.get(this.props.apiUrl, {
        params: {
          ...this.props.apiParams,
          page: this.state.page,
        }
      }).then(res => res.data).then(({data, meta}) => {
          let page = null;
          if (this.state.page < meta.last_page) {
            page = this.state.page + 1
          }

          let dataSource = data;
          if (!this.state.refresh) {
            dataSource = concat(this.state.dataSource, data);
          }

          this.setState({
            dataSource,
            page,
          })
        }).finally(() => {
          this.setState({
            loading: false,
            refresh: false
          });
        })
    });
  };

  render() {
    return (
      <FlatList
        horizontal={this.props.horizontal}
        extraData={this.state}
        data={this.state.dataSource}
        keyExtractor={(item, index) => item.id.toString()}
        ListFooterComponent={this.loadingComponent}
        onEndReached={this.handleLoadMore}
        renderItem={this.props.renderItem}
        onEndReachedThreshold={this.props.onEndReachedThreshold}
        onRefresh={this.handleRefresh}
        refreshing={this.state.refresh}
      />
    );
  }

}
