import {AsyncStorage} from 'react-native';
import {app} from './AppAuth'

const TOKEN = '@token';

export default {

  /**
   * Получение token из AsyncStorage учитывая expireIn
   *
   * @returns {Promise<void>}
   */
  async getToken() {
    // todo expire
    const token = await AsyncStorage.getItem(TOKEN, undefined);
    if (token) {
      return JSON.parse(token)
    }
    return null
  },

  /**
   * Установка token в AsyncStorage, учитывая expireIn
   *
   * @param token
   * @returns {Promise<void>}
   */
  async setToken(token) {
    // expires_in
    return await AsyncStorage.setItem(TOKEN, JSON.stringify(token));
  },

  /**
   * Удаляем токен
   *
   * @returns {Promise<*>}
   */
  async removeToken() {
    return await AsyncStorage.removeItem(TOKEN);
  },

  /**
   * Access Token
   * Результатом будет App Token или Client Token
   *
   * @returns {Promise<*>}
   */
  async getAccessToken() {
    let token = await this.getToken();
    if (token === null) {
      token = await app.authAsync().then(({data}) => data);
      await this.setToken(token)
    }
    return token.access_token
  },

  /**
   * Refresh Token для обновления Access Token
   *
   * @returns {Promise<null|*>}
   */
  async getRefreshToken() {
    const token = await this.getToken();
    if (token && typeof token.refresh_token !== 'undefined') {
      return token.refresh_token;
    }
    return null
  },

}

