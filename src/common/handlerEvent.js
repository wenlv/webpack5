export class handlerWorker {
    constructor() {
        console.log("construce---");
        this.workerEventObj = {};
        this.symbolWorkerType = Symbol();
    }

    addWorkerEvent(symbolWorkerType, handlerEvent) {
        console.log('addWorkerEvent--');
        this.workerEventObj[symbolWorkerType] = handlerEvent;
    }

    handleWorkerEvent(symbolWorkerType) {
        console.log('handleWorkerEvent--');
        if (this.workerEventObj[symbolWorkerType]) {
            return this.workerEventObj[symbolWorkerType]();
        }
        return null;
    }

    getSymbolWorkerType() {
        return this.symbolWorkerType;
    }
}
