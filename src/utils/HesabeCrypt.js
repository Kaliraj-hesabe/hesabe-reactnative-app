"use strict";
const aesjs = require("aes-js");

class HesabeCrypt {
  constructor(secret, iv) {
    this.key = secret;
    this.iv = iv;
  }

  encryptAes(txt) {


      //  var paddedTxt = this.pkcs5Pad(txt);
        var txtBytes = aesjs.padding.pkcs7.pad(aesjs.utils.utf8.toBytes(txt));
      //  var txtBytes = aesjs.utils.utf8.toBytes(paddedTxt);
        var aesCbc = new aesjs.ModeOfOperation.cbc(this.key, this.iv);
        var encBytes = aesCbc.encrypt(txtBytes);
        //console.log(encBytes);
        var encHex = aesjs.utils.hex.fromBytes(encBytes);
        return encHex;
    }

    decryptAes(encHex) {
        var encBytes = aesjs.utils.hex.toBytes(encHex);
        var aesCbc = new aesjs.ModeOfOperation.cbc(this.key, this.iv);
        var decBytes = aesCbc.decrypt(encBytes);
        var decTxt = aesjs.utils.utf8.fromBytes(decBytes);
        var strippedTxt = this.pkcs5Strip(decTxt);
        return strippedTxt;
    }

    pkcs5Pad(data) {
        var blockSize = 32;
        var padLen = blockSize - (data.length % blockSize);
        var paddedTxt = (data + this.strRepeat(String.fromCharCode(padLen), padLen));
        return paddedTxt;
    }

    pkcs5Strip(data) {
        var dataLen = data.length;
        if (dataLen < 32) {
            throw new Error('Invalid data length. Block size must be 32 bytes');
        }
        var padderCodeInt = parseInt(data.charCodeAt(dataLen - 1));
        if (padderCodeInt > 32) {
            throw new Error('PKCS#5 padding byte out of range');
        }
        var len = dataLen - padderCodeInt;
        var strippedTxt = data.substr(0, len);
        return strippedTxt;
    }

    strRepeat(input, multiplier) {
        var y = '';
        while (true) {
            if (multiplier & 1) {
                y += input;
            }
            multiplier >>= 1;
            if (multiplier) {
                input += input
            } else {
                break;
            }
        }
        return y;
    }

}

module.exports = HesabeCrypt;
