export interface globalOptionsType {
  namespace?: string;
  style?: boolean;
}

export const basespace = 'pt';

const separator = {
  common: '-',
  element: '__',
  modifier: '--',
};
const statePrefix = 'is-';
export let globalOptions: globalOptionsType = {
  style: false,
};

export const setOptions = (options: globalOptionsType): void => {
  options.namespace = options.namespace ?? basespace;
  globalOptions = {
    ...globalOptions,
    ...options,
  };
};

export const b = (
  block: string,
  element?: string,
  modifier?: string,
): string => {
  if (!block) return '';
  let namespace = basespace;
  if (globalOptions.style && globalOptions.namespace) {
    namespace = globalOptions.namespace;
  }
  let selector = `${namespace}${separator.common}${block}`;
  if (!element) return selector;
  selector += `${separator.element}${element}`;
  if (!modifier) return selector;
  selector += `${separator.modifier}${modifier}`;
  return selector;
};

export const s = (state: string): string => {
  if (!state) return '';
  return `${statePrefix}${state}`;
};
