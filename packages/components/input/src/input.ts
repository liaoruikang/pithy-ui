import { ExtractPropTypes } from 'vue';

import type Input from './input.vue';

export const inputProps = {
  modelValue: {
    type: String,
  },
};

export type InputProps = ExtractPropTypes<typeof inputProps>;

export type InstanceInput = InstanceType<typeof Input>;
