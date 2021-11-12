import { Transform } from 'stream';
import { cipher } from './../ciphering.js';

export default class AtbashTransformStream extends Transform {
  flag = '';
  constructor(flag) {
    super();
    this.flag = flag;
  }

  _transform(chunk, encoding, done) {
    const phrase = chunk.toString();

    if(this.flag.length > 1) {
      process.stderr.write('Invalid key for encoding/decoding');
      process.exit(128);
    }

    const cipherPrase = cipher(this.flag, phrase);

    done(null, cipherPrase);
  }
}