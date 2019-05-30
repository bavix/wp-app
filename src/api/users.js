import api from '../helpers/api'

export default {
  getProfile() {
    return api.get('/api/profile');
  }
}
