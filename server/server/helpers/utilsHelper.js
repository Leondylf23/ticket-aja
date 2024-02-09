const AES = require('crypto-js/aes');
const encodeUtf8 = require('crypto-js/enc-utf8');

const encryptSecret = 'xS2atT7h810yD'

const decryptData = (data) => data ? AES.decrypt(data, encryptSecret).toString(encodeUtf8) : null;
const encryptData = (data) => AES.encrypt(data, encryptSecret).toString();

module.exports = {
    decryptData,
    encryptData
}