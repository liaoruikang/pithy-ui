export const isString = (val: any): val is string => typeof val === 'string';

export const isDecimalNumber = (str: string): boolean => {
  if (typeof str !== 'string') return false;
  const num = Number(str);
  return !isNaN(num) && num.toString() === (str.replace(/^0+/, '') || '0');
};

export const isPromise = (value: any): value is Promise<any> => {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof value.then === 'function' &&
    typeof value.catch === 'function' &&
    typeof value.finally === 'function'
  );
};

export const isObject = (value: any): value is { [key: string]: any } =>
  typeof value === 'object' && value !== null;
export const isArray = (value: any): value is Array<any> =>
  Object.prototype.toString.call(value) === '[object Array]';
