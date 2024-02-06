import AES from 'crypto-js/aes';

const encryptSecret = 'xS2atT7h810yD';

export const encryptDataAES = (data) => AES.encrypt(data, encryptSecret).toString();
export const numberWithPeriods = (value) => value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : '0';