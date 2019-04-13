import axio from './Axio'
import { CLIENT_ID, CLIENT_SECRET } from '../constants/Config'

const authAsync = async (config) => {
  return await axio.post('oauth/token', {
    client_id: CLIENT_ID.toString(),
    client_secret: CLIENT_SECRET.toString(),
    ...config,
  })
};

export const app = {
  async authAsync(options) {
    return await authAsync({
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
    return await authAsync({
      grant_type: 'password',
      username,
      password,
      ...options,
    })
  },
  async refreshAsync(token) {
    // todo
  },
  async revokeAsync(token) {
    // todo
  },
};

export default { app, client }
