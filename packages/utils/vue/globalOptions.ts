export interface globalOptionsType {
  namespace?: string;
}

export const basespace = 'pt';

export let globalOptions: globalOptionsType = {
  namespace: basespace,
};

export const setOptions = (options: globalOptionsType): void => {
  globalOptions = {
    ...globalOptions,
    ...options,
  };
};
