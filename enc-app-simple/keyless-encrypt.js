
const fs = require('fs');

const encrypt = require('./pattern').encrypt;

let INPUT_FILE_PATH = './test/spec/encrypt-textfile/data/input-file.txt';
let OUTPUT_FILE_PATH = './test/spec/encrypt-textfile/data/output-file.txt';

let outputStream = fs.createWriteStream(OUTPUT_FILE_PATH);

fs.readFile(INPUT_FILE_PATH, (err, data) => {

  let e = 0;
  let e_max = 50;

  let buffer = data;
  let lastSliceOffset = 0;
  let sliceSize = 448;

  let slice;

  while (nextSlice()) {
    console.log(slice);
    outputStream.write(encrypt(slice));
    e++;
    if (e === e_max) {
      process.exit();
    }
  }

  function nextSlice () {

    slice = buffer.slice(lastSliceOffset, sliceSize);

    if (0 === slice.length) {
      return false;
    }

    lastSliceOffset = lastSliceOffset + sliceSize;
    console.log(lastSliceOffset, sliceSize);

    return true;

  }

});
