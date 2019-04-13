// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from 'react-native';
import { app } from './AppAuth';
import axio from './Axio';

const getToken = async () => {
  try {
    let deviceToken = AsyncStorage.getItem('@deviceToken')
    if (deviceToken === null) {
      const authData = await app.authAsync().then(({ data }) => data);
      console.log(authData);
    }
    return deviceToken;
  } catch (e) {
    console.log(e);
  }
};

export default {
  async get(url, config) {
    await getToken()
    return await axio.get(url, config)
  },
  async post(url, data, config) {
    return await axio.post(url, data, config)
  },
  async delete(url, config) {
    return await axio.delete(url, config)
  }
}
