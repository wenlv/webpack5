// import _ from 'lodash';
console.log('testTs---------------');
console.log('testTs-----++----------');
console.log('testTs---------------');

const testTs = () => {
    const num: number = 12;
    console.log("num---testTs---");
    console.log(num);
    const tsModule = _.join(['ts', 'module'], ' ');
    console.log("tsModule", tsModule);

}

module.exports = {
    testTs,
}