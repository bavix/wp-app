import axio from './axioInstance';
import TokenRegister from './../../helpers/TokenRegister';
import * as Localization from 'expo-localization'

const params = async (args) => {
  args = args || {};

  if (!args.headers) {
    args.headers = {}
  }

  if (!args.headers.Authorization) {
    const token = await TokenRegister.getAccessToken();
    args.headers.Authorization = `Bearer ${token}`;
  }

  const {locale} = await Localization.getLocalizationAsync();
  args.headers['Accept-Language'] = locale;

  console.log(args)
  return args
};

export default {
  async get(url, opts) {
    return await axio.get(url, await params(opts))
  },
  async post(url, data, opts) {
    return await axio.post(url, data, await params(opts))
  },
  async delete(url, opts) {
    return await axio.delete(url, await params(opts))
  },
}
