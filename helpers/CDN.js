export const BUCKET_WHEELS = 'wheels';
export const BUCKET_BRANDS = 'brands';
export const BUCKET_USERS = 'users';

export const VIEW_WHEELS_XS = 'xs';
export const VIEW_WHEELS_M = 'm';
export const VIEW_WHEELS_XL = 'xl';

export const VIEW_BRANDS_XS = 'xs';
export const VIEW_BRANDS_M = 'm';
export const VIEW_BRANDS_XL = 'xl';

export const VIEW_USERS_XS = 'xs';
export const VIEW_USERS_M = 'm';
export const VIEW_USERS_XL = 'xl';

export default {
  /**
   * @deprecated
   */
  getThumbnail(bucket, view, image) {
    if (image) {
      return {
        uri: image.thumbnails[view]
      }
    }
    return this.getPlaceholder(bucket)
  },

  /**
   * @deprecated
   */
  getPlaceholder(bucket) {
    switch (bucket) {
      case BUCKET_WHEELS:
        return require('../assets/images/wheels/placeholder.png');
      case BUCKET_BRANDS:
      case BUCKET_USERS:
        return require('../assets/images/users/placeholder.png');
    }
  }
}
