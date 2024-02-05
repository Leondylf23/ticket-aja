import AES from 'crypto-js/aes';

const encryptSecret = 'xS2atT7h810yD';

export const encryptDataAES = (data) => AES.encrypt(data, encryptSecret).toString();