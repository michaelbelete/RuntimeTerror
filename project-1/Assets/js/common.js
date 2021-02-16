// Password ENCRYPTION AND DECRYPTION
var crypt = {
  secret: "JFDIofdsjaio",

  encrypt: function (clear) {
    var cipher = CryptoJS.AES.encrypt(clear, crypt.secret);
    cipher = cipher.toString();
    return cipher;
  },

  decrypt: function (cipher) {
    var decipher = CryptoJS.AES.decrypt(cipher, crypt.secret);
    decipher = decipher.toString(CryptoJS.enc.Utf8);
    return decipher;
  },
};

export { crypt };
