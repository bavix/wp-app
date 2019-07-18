import api from '../helpers/api'

export default {
  signUp(username, email, password) {
    return api.post('/api/auth/register', {
      login: username,
      email,
      password,
    });
  },
  getProfile() {
    return api.get('/api/profile');
  }
}
