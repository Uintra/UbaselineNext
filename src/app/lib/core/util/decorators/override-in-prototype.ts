export function  OverrideInPrototype(target: any, method: string) {
    target.constructor.prototype[method] = target[method].bind(target);
}