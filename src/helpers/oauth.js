import axio from './axioInstance'
import {config} from '../constants'

const post = (path, params) => {
  return axio.post(path, {
    client_id: config.clientId.toString(),
    client_secret: config.clientSecret.toString(),
    ...params,
  })
};

export const app = {
  authAsync(options) {
    return post('oauth/token', {
      grant_type: 'client_credentials',
      ...options,
    })
  },
  revokeAsync(token) {
    // todo
  },
};

export const client = {
  authAsync(username, password, options) {
    return post('oauth/token', {
      grant_type: 'password',
      username,
      password,
      ...options,
    })
  },
  refreshAsync(refresh_token, options) {
    return post('oauth/token', {
      grant_type: 'refresh_token',
      refresh_token,
      ...options,
    })
  },
  revokeAsync(access_token, options) {
    // return req({
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
