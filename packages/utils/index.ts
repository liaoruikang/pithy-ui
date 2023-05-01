export const isPromise = (value: any): value is Promise<any> => {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof value.then === 'function' &&
    typeof value.catch === 'function' &&
    typeof value.finally === 'function'
  );
};
