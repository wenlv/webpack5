import { httpPost } from '../common/https';

console.log("window-----");
console.log(self);
self.onmessage = async (event) => {
    console.log("event---");
    console.log(event);
    const { worker } = event.data;

    const list = worker.map((v) => httpPost(v));
    const results = await Promise.all(list);
    console.log("results---");
    console.log(results);
    self.postMessage({
        results,
    });
}
