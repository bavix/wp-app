import axio from './Axio';
import TokenRegister from './TokenRegister';

/**
 * @deprecated
 */
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

  /**
   * @deprecated
   */
  async get(url, config) {
    return await axio.get(url, await updateConfig(config))
  },

  /**
   * @deprecated
   */
  async post(url, data, config) {
    return await axio.post(url, data, await updateConfig(config))
  },

  /**
   * @deprecated
   */
  async delete(url, config) {
    return await axio.delete(url, await updateConfig(config))
  }
}
