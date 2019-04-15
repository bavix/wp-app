import TokenRegister from './TokenRegister'

export default {
  async isGuest() {
    return await TokenRegister.getRefreshToken() === null;
  },
  async isUser() {
    return await TokenRegister.getRefreshToken() !== null;
  }
}
