import axios from 'axios'
import { config } from '../constants'

export default axios.create({
  baseURL: config.apiUrl,
})
