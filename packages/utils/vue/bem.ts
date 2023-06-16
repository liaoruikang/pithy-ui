import { debugWarn } from '../error';
import { isObject, isString } from '../typeGuard';
import { basespace, globalOptions } from './globalOptions';
import { BemChain, BemType } from './types';
import { deepEqual } from './util';

const isBemChain = (val: any): val is BemChain =>
  isObject(val) &&
  Object.keys(val).some(
    key =>
      ['block', 'element', 'modifier'].includes(key) &&
      (isString(val[key]) || val[key] === null),
  );

class Bem {
  #bemChain: BemChain = {
    block: null,
    element: null,
    modifier: null,
  };
  #namespace = globalOptions.namespace ?? basespace;
  #separator = {
    common: '-',
    element: '__',
    modifier: '--',
  };
  #statePrefix = 'is-';

  constructor(
    bem?: BemChain | string,
    namespace?: string,
    statePrefix?: string,
  ) {
    if (namespace) this.#namespace = namespace;
    if (statePrefix) this.#statePrefix = statePrefix;
    if (bem)
      if (isString(bem)) this.#bemChain.block = bem;
      else this.#bemChain = bem;
  }

  b(block?: string) {
    if (block) this.#bemChain.block = block;
    return this.getTaxon();
  }

  e(element?: string) {
    if (element) this.#bemChain.element = element;
    return this.getTaxon('element');
  }

  m(modifier?: string) {
    if (modifier) this.#bemChain.modifier = modifier;
    return this.getTaxon('modifier');
  }

  bem(BemChain: Partial<BemChain>, type: BemType = 'block') {
    if (!isBemChain(BemChain)) {
      debugWarn("The 'BemChain' parameter does not meet expectations.");
      return '';
    }
    this.#bemChain = { ...this.#bemChain, ...BemChain };
    return this.getTaxon(type);
  }

  _b(block: string) {
    return this.getTaxon('block', block);
  }

  _e(element: string) {
    return this.getTaxon('element', element);
  }

  _m(modifier: string) {
    return this.getTaxon('modifier', modifier);
  }

  _bem(block?: string, element?: string, modifier?: string) {
    const taxon = `${this.#namespace}${this.#separator.common}`;
    return block
      ? `${taxon}${block}${
          element
            ? `${this.#separator.element}${element}${
                modifier ? `${this.#separator.modifier}${modifier}` : ''
              }`
            : ''
        }`
      : '';
  }

  is(state: string) {
    return `${this.#statePrefix}${state}`;
  }

  cssVar(cssVar: string) {
    return `--${this.#namespace}${this.#separator.common}${cssVar}`;
  }

  getTaxon(type: BemType = 'block', name?: string) {
    if (!this.#exists(type)) {
      debugWarn('The current chain does not exist.');
      return '';
    }
    const taxon = `${this.#namespace}${this.#separator.common}`;
    switch (type) {
      case 'block':
        return taxon + (name ?? this.#bemChain.block);
      case 'element':
        return `${taxon}${this.#bemChain.block}${this.#separator.element}${
          name ?? this.#bemChain.element
        }`;
      case 'modifier':
        return `${taxon}${this.#bemChain.block}${this.#separator.element}${
          this.#bemChain.element
        }${this.#separator.modifier}${name ?? this.#bemChain.modifier}`;
    }
  }

  #exists(type: BemType = 'block'): boolean {
    switch (type) {
      case 'block':
        return !!this.#bemChain.block;
      case 'element':
        return this.#exists() && !!this.#bemChain.element;
      case 'modifier':
        return this.#exists('element') && !!this.#bemChain.modifier;
      default:
        return false;
    }
  }
}

const ns = new Bem();

/**
 * @description Singleton cache, 'new' operation of the same parameter reuses previous instances.
 */
const bemMap = new Map<any, Bem>();
const ProxyBem = new Proxy(Bem, {
  construct(target, args) {
    for (const [argItem, bem] of bemMap) {
      if (deepEqual(argItem, args)) return bem;
    }
    const bem = new target(...args);
    bemMap.set(args, bem);
    return bem;
  },
});

export { ProxyBem as Bem, ns };
