
const fs = require('fs');

const encrypt = require('./pattern').encrypt;

let INPUT_FILE_PATH = './test/spec/encrypt-textfile/data/input-file.txt';
let OUTPUT_FILE_PATH = './test/spec/encrypt-textfile/data/output-file.txt';

let outputStream = fs.createWriteStream(OUTPUT_FILE_PATH);

let opts = {
  encoding: 'utf8',
};

fs.readFile(INPUT_FILE_PATH, opts, (err, data) => {

  let e = 0;
  let e_max = 10;

  let buffer = data;
  let lastSliceOffset = 0;
  let sliceSize = 32;

  let slice;

  outputStream.cork();
  process.nextTick(() => stream.uncork());

  while (nextSlice()) {
    outputStream.write(encrypt(slice));
    e++;
    if (e === e_max) {
      outputStream.end();
      process.exit();
    }
  }

  outputStream.end();
  process.exit();

  function nextSlice () {

    slice = Buffer.from(buffer.slice(lastSliceOffset, lastSliceOffset + sliceSize));
    console.log('buffer.slice(',lastSliceOffset,',',lastSliceOffset + sliceSize,')');

    // if (0 === slice.length) {
    //   return false;
    // }

    if (32 !== slice.length) {
      return false;
    }

    lastSliceOffset = lastSliceOffset + sliceSize;
    console.log('x', lastSliceOffset, sliceSize);

    return true;

  }

});
