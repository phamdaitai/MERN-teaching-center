import { combineReducers } from 'redux';
import changeUserLogin from './loginReducer'

const appReducer = combineReducers({
  changeUserLogin
});

export default appReducer;