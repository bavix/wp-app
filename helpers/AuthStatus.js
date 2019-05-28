import TokenRegister from './TokenRegister'

export default {

  /**
   * @deprecated
   */
  async isGuest() {
    return await TokenRegister.getRefreshToken() === null;
  },

  /**
   * @deprecated
   */
  async isUser() {
    return await TokenRegister.getRefreshToken() !== null;
  }
}
