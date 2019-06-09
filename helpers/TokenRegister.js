import {AsyncStorage} from 'react-native';
import {app, client} from '../src/api/oauth'
import {addIssuer, isExpired, isUser} from "../src/helpers/tokenizer";

/**
 * @deprecated
 */
const TOKEN = '@token';

/**
 * @deprecated
 */
const ob = (obj) => {
  if (typeof obj.toJS === "function") {
    return obj.toJS();
  }
  return obj;
};

/**
 * @deprecated
 */
export default {

  /**
   * Получение token из AsyncStorage учитывая expireIn
   *
   * @returns {Promise<void>}
   * @deprecated
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
   * @deprecated
   */
  async setToken(token) {
    // expires_in
    return await AsyncStorage.setItem(TOKEN, JSON.stringify(addIssuer(ob(token))));
  },

  /**
   * Удаляем токен
   *
   * @returns {Promise<*>}
   * @deprecated
   */
  async removeToken() {
    return await AsyncStorage.removeItem(TOKEN);
  },

  /**
   * Access Token
   * Результатом будет App Token или Client Token
   *
   * @returns {Promise<*>}
   * @deprecated
   */
  async getAccessToken() {
    let token = await this.getToken();
    if (isUser(token) && isExpired(token)) {
      token = await client.refreshAsync(token.refresh_token)
        .then(({data}) => data);

      await this.setToken(token)
    }
    if (token === null || isExpired(token)) {
      token = await app.authAsync().then(({data}) => data);
      await this.setToken(token)
    }
    return token.access_token
  },

  /**
   * Refresh Token для обновления Access Token
   *
   * @returns {Promise<null|*>}
   * @deprecated
   */
  async getRefreshToken() {
    const token = await this.getToken();
    if (token && typeof token.refresh_token !== 'undefined') {
      return token.refresh_token;
    }
    return null
  },

}

