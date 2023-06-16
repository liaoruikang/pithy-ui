import { RuleItem } from 'async-validator';
import { PropType } from 'vue';

export type Size = number | [number, number];

export type SizeProp = PropType<Size>;

export type Trigger = 'change' | 'input' | 'blur' | 'focus' | '';
export type RuleProp = RuleItem & { trigger: Trigger };

export type Align = 'left' | 'center' | 'right';

export interface BemChain {
  block: null | string;
  element: null | string;
  modifier: null | string;
}

export type BemType = 'block' | 'element' | 'modifier';
