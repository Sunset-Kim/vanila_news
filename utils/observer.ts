import { AnyObject } from "../types/common";

let currentObserver: any = null;

const observe = (fn: () => void) => {
  currentObserver = fn;
  fn();
  currentObserver = null;
};

const observable = <T extends AnyObject>(obj: T) => {
  Object.keys(obj).forEach((key) => {
    let _value = obj[key];
    const observers = new Set<() => void>();

    Object.defineProperty(obj, key, {
      get() {
        if (currentObserver) observers.add(currentObserver);
        return _value;
      },

      set(value) {
        _value = value;
        observers.forEach((fn) => fn());
      },
    });
  });
  return obj;
};

export { observe, observable };
