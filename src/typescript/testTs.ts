import _ from 'lodash';

const testTs = () => {
    const num: number = 12;
    console.log("num---testTs---");
    console.log(num);
    const tsModule = _.join(['ts', 'module'], ' ');
    console.log(tsModule);

}

module.exports = {
    testTs,
}