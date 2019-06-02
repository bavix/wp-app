import axios from 'axios'
import {config} from '../constants'

export default axios.create({
  timeout: 8000,
  baseURL: config.apiUrl,
})
