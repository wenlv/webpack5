export const requestWebWorker = (obj) => new Promise((resolve) => {
    const work = new Worker(new URL('./work.js', import.meta.url));
    console.log(new URL(obj.filePath, import.meta.url));
    console.log("work------");

    work.postMessage(obj);
    work.onmessage = (event) => {
        console.log("work---msg");
        console.log(event);
        // 主线程关闭weoker
        obj.isTerminate && work.terminate();

        resolve(event.data);
    };
})
