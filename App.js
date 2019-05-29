import React from 'react'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import { AppLoading, Asset, Font, Icon } from 'expo'
import AppNavigator from './src/navigation/AppNavigator'
import createSagaMiddleware from 'redux-saga'
import reducers from './src/reducers'
import rootSaga from './src/sagas'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import ReduxSagaExposedPromise from './src/middlewares/ReduxSagaExposedPromise';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducers,
  {},
  applyMiddleware(ReduxSagaExposedPromise, sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }

    return (
      <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      </Provider>
    );
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/wheels/placeholder.png'),
        require('./assets/images/users/placeholder.png'),
      ]),
      Font.loadAsync({
        ...Icon.Ionicons.font,
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
