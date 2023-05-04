export const emitsVerify = <T>(types: Array<string>): ((val: T) => boolean) => {
  return (val: T): boolean => {
    return types.includes(typeof val);
  };
};
