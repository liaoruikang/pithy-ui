import type { Component, PropType } from 'vue';

export const iconProps = {
  color: {
    type: String,
    default: '#000',
  },
  size: {
    type: String,
    default: '16px',
  },
  iconComponent: {
    type: Object as PropType<Component>,
    required: true,
  },
};
