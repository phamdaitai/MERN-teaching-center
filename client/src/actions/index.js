import * as Types from '../utils/constants';

export const saveUserLogin = (userInfo) => {
  return {
    type: Types.SAVE_USER_LOGIN,
    userInfo
  }
}