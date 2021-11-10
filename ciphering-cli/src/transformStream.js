import { Transform } from 'stream';
import { atbash, decodingCaesar, decodingROT8, encodingCaesar, encodingROT8 } from './ciphering.js';

export default class TransformStream extends Transform {
  cipheringArr = [];

  constructor(option = {}) {
    super(option);
    this.cipheringArr = option.config.split('-');
  }
  _transform(chunk, encoding, done) {
    const phrase = chunk.toString()

    const cipherPrase = cipher(this.cipheringArr, phrase);
    
    done(null, cipherPrase);
  }
}

const cipher = (code, phrase) => {
  code.forEach(item => {
    switch(item) {
      case 'C1':
        phrase = encodingCaesar(phrase);
        break;
      case 'C0':
        phrase = decodingCaesar(phrase);
        break;
      case 'R1':
        phrase = encodingROT8(phrase);
        break;
      case 'R0':
        phrase = decodingROT8(phrase);
        break;
      case 'A':
        phrase = atbash(phrase);
        break;
    }
  })

  return phrase;
}