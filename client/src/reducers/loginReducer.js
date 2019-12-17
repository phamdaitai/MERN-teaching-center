import * as Types from '../utils/constants';

const initUser = {};

const changeUserLogin = (state = initUser, action) => {
  switch (action.type) {
    case Types.SAVE_USER_LOGIN:
      console.log('Info Store:', action.userInfo);
      state = { ...action.userInfo };
      return state;
    default:
      return state;
  }
}

export default changeUserLogin;