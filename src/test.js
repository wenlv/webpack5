import $ from 'jquery';
import getHelloApi from './vuex/getHello';
import { requestWebWorker } from './webWorker/requestWebWorker';

export default function test() {
    console.log('test-11!!');
    console.log($);

    getHelloApi().then((res) => {
        console.log('getapi-res');
        console.log(res);
    })

    requestWebWorker({
        workerList: [
            { url: '/api/hello', data: { id: '0' } },
            { url: '/api/hello1', data: { id: '1' } },
            { url: '/api/hello2', data: { id: '2' } },
            { url: '/api/hello3', data: { id: '3' } },
            { url: '/api/hello4', data: { id: '4' } },
        ],
        isTerminate: true,
        // isClose:true,
    }).then((res) => {
        console.log('res---test--worker');
        console.log(res);
    })
}
