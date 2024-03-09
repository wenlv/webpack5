const requestWebWorker = (obj) => new Promise((resolve) => {
    const work = new Worker(new URL('/src/webWorker/work.js', import.meta.url));

    // const work = new Worker(new URL(params.filePath, import.meta.url));

    work.postMessage(obj);
    work.onmessage = (event) => {
        console.log("work---msg");
        console.log(event);
        // 主线程关闭weoker
        work.terminate();

        resolve(event.data);
    };
})

module.exports = {
    requestWebWorker,
}
