import { Transform } from 'stream';
import { cipher } from './ciphering.js';

export default class TransformStream extends Transform {
  cipheringArr = [];

  constructor(option = {}) {
    super(option);
    this.cipheringArr = option.config.split('-');
  }
  _transform(chunk, encoding, done) {
    const phrase = chunk.toString();

    const cipherPrase = cipher(this.cipheringArr, phrase);
    done(null, cipherPrase);
  }
}