import { RuleItem } from 'async-validator';
import { PropType } from 'vue';

export type Size = string | number | [string | number, string | number];

export type SizeProp = PropType<Size>;

export type Trigger = 'change' | 'input' | 'blur' | 'focus' | '';
export type RuleProp = RuleItem & { trigger: Trigger };

export type Align = 'left' | 'center' | 'right';
