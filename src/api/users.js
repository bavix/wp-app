import api from '../helpers/api'

export default {
  forgot(email) {
    return api.post('/api/auth/forgot', { email });
  },
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
