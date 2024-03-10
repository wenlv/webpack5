console.log('another module');

// this.alert('alert');

const { file, parse, test } = require('./common/global');

console.log("file---------");
console.log(file);
parse();
test();
