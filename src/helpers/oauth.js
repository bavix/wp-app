import axio from './axioInstance'
import {config} from '../constants'

const post = async (path, params) => {
  return await axio.post(path, {
    client_id: config.clientId.toString(),
    client_secret: config.clientSecret.toString(),
    ...params,
  })
};

export const app = {
  async authAsync(options) {
    return await post('oauth/token', {
      grant_type: 'client_credentials',
      ...options,
    })
  },
  async revokeAsync(token) {
    // todo
  },
};

export const client = {
  async authAsync(username, password, options) {
    return await post('oauth/token', {
      grant_type: 'password',
      username,
      password,
      ...options,
    })
  },
  async refreshAsync(refresh_token, options) {
    return await post('oauth/token', {
      grant_type: 'refresh_token',
      refresh_token,
      ...options,
    })
  },
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
