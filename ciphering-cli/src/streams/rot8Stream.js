import { Transform } from 'stream';
import { cipher } from './../ciphering.js';

export default class ROT8TransformStream extends Transform {
  flag = '';
  constructor(flag) {
    super();
    this.flag = flag;
  }

  _transform(chunk, encoding, done) {
    const phrase = chunk.toString();

    if(this.flag[1] != 0 && this.flag[1] != 1) {
      process.stderr.write('Invalid key for encoding/decoding');
      process.exit();
    }

    const cipherPrase = cipher(this.flag, phrase);

    done(null, cipherPrase);
  }
}