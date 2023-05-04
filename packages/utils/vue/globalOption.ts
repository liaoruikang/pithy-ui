export interface globalOptionsType {
  type?: string;
  namespace?: string;
}

export let globalOptions: globalOptionsType = {};

export const setOptions = (options: globalOptionsType): void => {
  globalOptions = options;
};
