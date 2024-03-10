console.log('another module------------++++++-------------------');
console.log(Array.from([1, 2, 3], (x) => x + x));

// this.alert('alert');

const { file, parse, test } = require('./common/global');

console.log("file---------");
console.log(file);
parse();
test();
