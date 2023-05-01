import { ExtractPropTypes } from 'vue';

export const iconProps = {
  color: {
    type: String,
  },
  size: {
    type: String,
    default: '1em',
  },
};

export type switchProps = ExtractPropTypes<typeof iconProps>;
