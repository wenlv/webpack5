import { httpPost } from '../common/https';

self.onmessage = async (event) => {
    console.log("event---");
    console.log(event);
    console.log(self);
    // console.log(workerGlobal);
    console.time();
    const { workerList, isClose } = event.data;

    const list = workerList.map((v) => httpPost(v));
    const results = await Promise.all(list);

    console.timeEnd();
    console.log("results---");
    console.log(results);
    self.postMessage({
        results,
    });
    // 在子线程关闭worker
    isClose && self.close();
}
