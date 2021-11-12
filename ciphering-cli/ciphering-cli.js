import process from 'process';
import fs from 'fs';
import CaesarTransformStream from './src/streams/caesarStream.js';
import ROT8TransformStream from './src/streams/rot8Stream.js';
import AtbashTransformStream from './src/streams/atbashStream.js';
import { pipeline } from 'stream';

const flagsArr = process.argv.slice(2);

const findDuplicateFlags = (arr) => arr.filter((item, index) => arr.indexOf(item) != index);

const duplicate = findDuplicateFlags(flagsArr);

duplicate.forEach(item => {
  if(item[0] === '-') {
    process.stderr.write('Duplicate parameters are not allowed');
    process.exit();
  }
});

const inputFlagIndex = process.argv.indexOf('-i');
const configFlagIndex = process.argv.indexOf('-c');
const outputFlagIndex = process.argv.indexOf('-o');
let config;

let transformStreams = [];
let readStream;
let writeStream;

if(inputFlagIndex !== -1) {
  const inputFileName = process.argv[inputFlagIndex + 1];

  if(inputFileName == null) {
    process.stderr.write('File name is incorrect');
    process.exit();
  }

  readStream = fs.createReadStream(`./${inputFileName}`, 'utf-8');
} else {
  readStream = process.stdin;
}

if(outputFlagIndex !== -1) {
  const outputFileName = process.argv[outputFlagIndex + 1];

  if(outputFileName == null) {
    process.stderr.write('File name is incorrect');
    process.exit();
  }

  writeStream = fs.createWriteStream(`./${outputFileName}`);
} else {
  writeStream = process.stdout;
}

if(configFlagIndex !== -1) {
  config = process.argv[configFlagIndex + 1];
  if(config == null) {
    process.stderr.write('No configuration parameter specified');
    process.exit();
  }

  const isValid = /[A|C|R|0|1]/;

  if(!isValid.test(config[0]) || !isValid.test(config[config.length - 1])) {
    process.stderr.write('Incorrect config passed');
    process.exit();
  }
} else {
  process.stderr.write('Need to pass configuration parameter');
  process.exit();
}
config.split('-').forEach(flag => {
  switch(flag[0]) {
    case 'C':
      transformStreams.push(new CaesarTransformStream(flag));
      break;
    case 'R':
      transformStreams.push(new ROT8TransformStream(flag));
      break;
    case 'A':
      transformStreams.push(new AtbashTransformStream(flag));
      break;
    default:
      process.stderr.write('Incorrect config passed');
      process.exit();
  }
});

pipeline(
  readStream,
  ...transformStreams,
  writeStream,
  (err) => {
    if(err) {
      console.error(err);
    }
  }
)
