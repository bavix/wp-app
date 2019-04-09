import axios from 'axios';
import { baseURL } from '../constants/Server';

const instance = axios.create();

instance.defaults.baseURL = baseURL;

export default instance;
