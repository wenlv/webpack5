import $ from 'jquery';
import getHelloApi from './vuex/getHello';

export default function test() {
    console.log('test-11!!');
    console.log($);

    getHelloApi().then((res) => {
        console.log('getapi-res');
        console.log(res);
    })
}
