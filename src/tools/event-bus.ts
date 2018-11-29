const listeners: any = {};

function on(type: string, cb: any, isOnce?: boolean) {
    if (typeof cb !== "function") {
        return;
    }
    if (!listeners[type]) {
        listeners[type] = [cb];
    } else {
        listeners[type].push(cb);
    }
    cb.once = !!isOnce;
}

function one(type: string, cb: any) {
    on(type, cb, true);
}

function emit(type: string, data: any) {
    let isEmpty = Object.keys(listeners).length === 0;
    if (isEmpty) {
        return;
    }
    isEmpty = !listeners[type] || listeners[type].length === 0;
    if (isEmpty) {
        return;
    }
    listeners[type].forEach((cb: any, n: number, arr: any[]) => {
        if (cb) {
            cb(data);
            if (cb.once) {
                arr.splice(n, 1);
            }
        }
    });
}

function off(type: string, cb: any): any {
    let isEmpty = Object.keys(listeners).length === 0;
    if (isEmpty) {
        return;
    }
    isEmpty = !listeners[type] || listeners[type].length === 0;
    if (isEmpty) {
        return;
    }
    if (cb === undefined) {
        return listeners[type] = null;
    }
    listeners[type].forEach((oldCb: any, n: number, arr: any[])=> {
        if (oldCb === cb) {
            arr.splice(n, 1);
        }
    });
}

let EventBus = {
    on,
    one,
    emit,
    off,
};

export default EventBus;

