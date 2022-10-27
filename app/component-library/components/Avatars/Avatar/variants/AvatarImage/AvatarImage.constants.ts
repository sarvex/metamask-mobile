/* eslint-disable import/prefer-default-export */
// Third party dependencies.
import { ImageSourcePropType } from 'react-native';

export const TEST_AVATAR_IMAGE_URI =
  'https://cryptologos.cc/logos/curve-dao-token-crv-logo.png';
/* eslint-disable-next-line */
export const TEST_AVATAR_IMAGE_LOCAL_IMAGE_SOURCE: ImageSourcePropType = require('../../../../../../images/fox.png');
export const TEST_AVATAR_IMAGE_REMOTE_IMAGE_SOURCE: ImageSourcePropType = {
  uri: TEST_AVATAR_IMAGE_URI,
};

export const AVATAR_IMAGE_TEST_ID = 'avatar-image';
export const AVATAR_IMAGE_HALO_TEST_ID = 'avatar-image-halo';
export const AVATAR_IMAGE_IMAGE_TEST_ID = 'avatar-image-image';
