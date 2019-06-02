import get from 'lodash/get'

/**
 * @param {Object} payload
 */
export function accessToken(payload) {
  return get(payload, 'access_token', null)
}

/**
 * @param {Object} payload
 */
export function refreshToken(payload) {
  return get(payload, 'refresh_token', null)
}

/**
 * @param {Object} payload
 */
export function isUser(payload) {
  return refreshToken(payload) !== null
}

/**
 * @param {Object} payload
 */
export function addIssuer(payload) {
  return {
    issued_at: +new Date(),
    ...payload
  };
}

/**
 * @param {Object} payload
 */
export function isExpired({issued_at, expires_in}) {
  return (new Date() / 1e3 | 0) <= (issued_at + expires_in)
}
