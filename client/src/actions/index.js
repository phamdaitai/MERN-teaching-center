import * as Types from '../utils/constants';

export const saveUserLogin = (userInfo) => {
  return {
    type: Types.SAVE_USER_LOGIN,
    userInfo
  }
}

export const convertURL = (str) => {
  str = str.toLowerCase();
  // xóa dấu
  str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
  str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
  str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
  str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
  str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
  str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
  str = str.replace(/(đ)/g, 'd');

  // Xóa ký tự đặc biệt
  str = str.replace(/([^0-9a-z-\s])/g, '');

  // Xóa khoảng trắng thay bằng ký tự -
  str = str.replace(/(\s+)/g, '-');

  // xóa phần dự - ở đầu
  str = str.replace(/^-+/g, '');

  // xóa phần dư - ở cuối
  str = str.replace(/-+$/g, '');

  // return
  return str;
}

export const validateInputNumber = (rule, value, callback) => {
  if (value[0] === "0") {
    callback("Bắt đầu bằng chữ số khác 0!");
  }
  for (let i = 0; i < value.length; i++) {
    if (value[i].charCodeAt(0) < 48 || value[i].charCodeAt(0) > 57) {
      callback("Phải là chữ số");
    }
  }
  callback();
}

export const FormatDate = (date) => {
  let d = new Date(date);
  let dateFormat = `${d.getUTCDate()}/` + `${d.getUTCMonth() + 1}/` + `${d.getFullYear()}`;
  return dateFormat;
}

export const FormatTime = (date) => {
  let d = new Date(date);
  let hour = d.getUTCHours();
  let min = d.getUTCMinutes();
  let timeFormat = `${hour + 7}:` + `${min > 10 ? min : '0' + min}`;
  return timeFormat;
}

export const checValidation = (value) => {
  let fistCharUppercase = false;//Kiem tra ky tu dau la chu viet hoa
  let numberNotNull = false;//Kiem tra co it nhat 1 so trong chuoi
  let specialCharacterNotNull = false;//Kiem tra co it nhat 1 ky tu dac biet
  let passwordMinLength = false;//Kiem tra do dai password >= 8
  for (let i = 0; i < value.length; i++) {
    if (value[i].charCodeAt(0) >= 48 && value[i].charCodeAt(0) <= 57) {
      numberNotNull = true;
    }
    if (value[i].charCodeAt(0) >= 58 && value[i].charCodeAt(0) <= 64) {
      specialCharacterNotNull = true;
    }
  }
  if (value[0].charCodeAt(0) >= 65 && value.charCodeAt(0) <= 90) fistCharUppercase = true;
  if (value.length >= 8) passwordMinLength = true;

  if (fistCharUppercase && numberNotNull && specialCharacterNotNull && passwordMinLength) {
    return true;
  }
  return false;
}
