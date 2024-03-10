const add = (x, y) => x + y;
const reduce = (x, y) => x - y;
const compute = (num) => {
    let sum = 0;
    for (let i = 0; i < num; i++) {
        sum += i;
    }
    return sum;
}
module.exports = {
    add,
    reduce,
    compute,
}
