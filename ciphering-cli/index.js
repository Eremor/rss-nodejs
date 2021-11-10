import process from 'process';
import fs from 'fs';
import TransformStream from './src/transformStream.js';

// const flagsArr = process.argv.slice(2);

// const findDuplicateFlags = (arr) => arr.filter((item, index) => arr.indexOf(item) != index);

// const duplicate = findDuplicateFlags(flagsArr);

// duplicate.forEach(item => item[0] === '-' ? console.log('have duplicate, make error') : null);

// const inputFlagIndex = process.argv.indexOf('-i');
// const configFlagIndex = process.argv.indexOf('-c');
// const outputFlagIndex = process.argv.indexOf('-o');

// if(inputFlagIndex !== -1) {
//   inputFileName = process.argv[inputFlagIndex + 1];
// } else {
//   process.stdin.on('data', data => {
//     input = data.toString();
//     process.stdout.write('Input phrase: ');
//     process.stdout.write(input);
//     process.exit();
//   });
// }

// if(configFlagIndex !== -1) {
//   process.stdout.write('\nmake something\n');
//   const config = process.argv[configFlagIndex + 1];
//   process.stdout.write(`\nMake transform this prase: ${input}`);
// } else {
//   process.stderr.write('do not find config');
//   process.exit();
// }

// if(outputFlagIndex !== -1) {
//   const outputFile = process.argv[outputFlagIndex + 1];
//   const writableStream = fs.createWriteStream(`./${outputFile}`);
//   readableStream.pipe(writableStream);
// } else {
//   process.stdout.write('Output prase: ');
//   process.stdout.write(input);
//   process.exit();
// }

const readableStream = fs.createReadStream('./input.txt', 'utf-8');
const writableStream = fs.createWriteStream(`./output.txt`);

readableStream.on('data', (chunk) => chunk.toString());
readableStream.on('error', (err) => console.log(err.stack));
readableStream.pipe(new TransformStream({config: 'C1-R1-C0-C0-A-R0-R1-R1-A-C1'})).pipe(writableStream);