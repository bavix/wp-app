import axios from 'axios';
import { config } from '../constants';

export default (params = {}) => {
  const { url, token } = params;
  const baseURL = url || config.apiUrl;

  const instanceConfig = {
    baseURL,
    headers: {
      'Content-Type': 'application/vnd.api+json',
      Accept: '*/*',
      cookie: '',
    },
  };

  if (token) {
    instanceConfig.headers.Authorization = `Bearer ${token}`;
  }

  return axios.create(instanceConfig);
};
