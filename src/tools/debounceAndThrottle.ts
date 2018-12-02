/**
 * 防抖动
 * @param {*执行的函数} fn 
 * @param {*延时} delay 
 * @param {*是否立即触发} isImmediate 
 */
export function debounce(fn: () => void, delay:number= 2000, isImmediate?: false) {
    let timer: any = null;

    return function (this: any) {
        let ctx = this; // 保存作用域
        let args = arguments; // 保存参数
        // 初始化清空所有定时器
        if (timer) {
            clearTimeout(timer);
        }
        // 如果是立即触发
        if (isImmediate) {
            if (!timer) { // timer为空时触发操作
                fn.apply(ctx, args);
            }
            // delay时间后置空timer
            timer = setTimeout(() => {
                timer = null;
            }, delay);
        } else { // delay时间后触发操作
            timer = setTimeout(() => {
                fn.apply(ctx, args);
            }, delay);
        }
    };
};

/**
 * 节流
 * @param {*执行的函数} fn 
 * @param {*延时} delay 
 * @param {*是否立即触发} isImmediate 
 */
export function throttle(fn: () => void, delay:number= 2000, isImmediate?: true) {
    let timer: any = null;

    return function (this: any) {
        let ctx = this; // 保存作用域
        let args = arguments; // 保存参数
        if (!timer) { // timer为空时
            if (isImmediate) { fn.apply(ctx, args); } // 立即触发
            timer = setTimeout(()=>{
                clearTimeout(timer);
                timer = null;
                if (!isImmediate) { fn.apply(ctx, args); } // delay时间后触发操作
            }, delay);
        }
    };
};