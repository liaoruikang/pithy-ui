export const isString = (val: any): val is string => typeof val === 'string';

export const isDecimalNumber = (str: string): boolean => {
  if (typeof str !== 'string') return false;
  const num = Number(str);
  return !isNaN(num) && num.toString() === (str.replace(/^0+/, '') || '0');
};

export const isPromise = (val: any): val is Promise<any> => {
  return (
    typeof val === 'object' &&
    val !== null &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function' &&
    typeof val.finally === 'function'
  );
};

export const isObject = (val: any): val is { [key: string]: any } =>
  typeof val === 'object' && val !== null;
export const isArray = <T>(val: any): val is Array<T> =>
  Object.prototype.toString.call(val) === '[object Array]';

export const isUndefined = (val: any): val is undefined =>
  typeof val === 'undefined';
