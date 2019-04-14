// import AsyncStorage from '@react-native-community/async-storage';
import axio from './Axio';
import TokenRegister from './TokenRegister';

const updateConfig = async (config) => {
  if (config === undefined) {
    config = {}
  }

  if (!config.headers) {
    config.headers = {}
  }

  if (!config.headers.Authorization) {
    const token = await TokenRegister.getAccessToken();
    config.headers.Authorization = 'Bearer ' + token;
  }

  console.log(config)

  return config
};

export default {
  async get(url, config) {
    return await axio.get(url, await updateConfig(config))
  },
  async post(url, data, config) {
    return await axio.post(url, data, await updateConfig(config))
  },
  async delete(url, config) {
    return await axio.delete(url, await updateConfig(config))
  }
}
