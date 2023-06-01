import { ExtractPropTypes, PropType, VNode } from 'vue';

export const iconProps = {
  color: {
    type: String,
  },
  size: {
    type: String,
    default: '1em',
  },
  customIcon: {
    type: [SVGElement, String, Object] as PropType<SVGElement | string | VNode>,
  },
};

export type iconProps = ExtractPropTypes<typeof iconProps>;
