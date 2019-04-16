import axio from './Axio'
import {CLIENT_ID, CLIENT_SECRET} from '../constants/Config'

const post = async (path, config) => {
  return await axio.post(path, {
    client_id: CLIENT_ID.toString(),
    client_secret: CLIENT_SECRET.toString(),
    ...config,
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

export default {app, client}
