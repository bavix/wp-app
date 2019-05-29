import axio from './Axio'
import {config} from '../src/constants'

/**
 * @deprecated
 */
const post = async (path, params) => {
  return await axio.post(path, {
    client_id: config.clientId.toString(),
    client_secret: config.clientSecret.toString(),
    ...params,
  })
};

/**
 * @deprecated
 */
export const app = {

  /**
   * @deprecated
   */
  async authAsync(options) {
    return await post('oauth/token', {
      grant_type: 'client_credentials',
      ...options,
    })
  },

  /**
   * @deprecated
   */
  async revokeAsync(token) {
    // todo
  },
};

/**
 * @deprecated
 */
export const client = {

  /**
   * @deprecated
   */
  async authAsync(username, password, options) {
    return await post('oauth/token', {
      grant_type: 'password',
      username,
      password,
      ...options,
    })
  },

  /**
   * @deprecated
   */
  async refreshAsync(refresh_token, options) {
    return await post('oauth/token', {
      grant_type: 'refresh_token',
      refresh_token,
      ...options,
    })
  },

  /**
   * @deprecated
   */
  async revokeAsync(access_token, options) {
    // return await req({
    //   grant_type: 'revoke_token',
    //   refresh_token,
    //   ...options,
    // })
    // todo
  },
};


/**
 * @deprecated
 */
export default {app, client}
