import React from 'react'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import * as Icon from '@expo/vector-icons'
import AppNavigator from './src/navigation/AppNavigator'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './src/sagas'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import ReduxSagaExposedPromise from './src/middlewares/ReduxSagaExposedPromise';
import immutableTransform from 'redux-persist-transform-immutable';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import {AsyncStorage} from 'react-native';
import rootReducer from './src/reducers'

const persist = {
  transforms: [immutableTransform()],
  key: 'ru.wheelpro.app',
  storage: AsyncStorage,
  whitelist: ['user', 'localSettings'],
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  persistReducer(persist, rootReducer),
  applyMiddleware(ReduxSagaExposedPromise, sagaMiddleware)
);

[rootSaga].forEach(sagaMiddleware.run);

const persistor = persistStore(store);

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
        <PersistGate persistor={persistor} loading={null}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
        </PersistGate>
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
