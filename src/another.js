const webpack5Library = require("webpack5-library");

console.log('another module------------++++++-------------------');
console.log(Array.from([1, 2, 3], (x) => x + x));

// this.alert('alert');
console.log("webpack5Library", webpack5Library);
console.log(webpack5Library.numToWord(5));

const { file, parse, test } = require('./common/global');

console.log("file---------");
console.log(file);
parse();
test();
