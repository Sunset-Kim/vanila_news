export type AnyObject = {
  [key: string]: any;
};

export type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T];
