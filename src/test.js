import getHelloApi from './vuex/getHello';

export default function test() {
    console.log('test-11!!');

    getHelloApi().then((res) => {
        console.log('getapi-res')：
        console.log(res);
    })
}
