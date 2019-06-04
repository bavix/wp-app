import get from 'lodash/get'
import {buckets} from '../constants'

export function getThumbnail(thumbnail, image) {
  const [bucket, view] = thumbnail.split('.');
  const uri = get(image, `thumbnails.${view}`);

  if (uri) {
    return {uri};
  }

  return getPlaceholder(bucket);
}

export function getPlaceholder(bucket) {
  switch (bucket) {
    case buckets.wheels:
      return require('../../assets/images/wheels/placeholder.png');
    case buckets.brands:
    case buckets.users:
      return require('../../assets/images/users/placeholder.png');
  }
}
