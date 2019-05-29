import axios from 'axios'
import {config} from '../src/constants'

/**
 * @deprecated
 */
export default axios.create({
  baseURL: config.apiUrl,
})
