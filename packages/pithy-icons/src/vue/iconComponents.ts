import {
  sun,
  moon,
  loading,
  loading2,
  error,
  success,
  add,
  minus,
  arrowsTop,
  arrowsBottom,
  eye,
  closeEye,
  clear,
} from '../svg';
import { ComponentPlugin, basespace } from '@pithy-ui/utils/vue';

const options = [
  {
    name: `${basespace}-sun`,
    url: sun,
  },
  {
    name: `${basespace}-moon`,
    url: moon,
  },
  {
    name: `${basespace}-loading`,
    url: loading,
  },
  {
    name: `${basespace}-loading2`,
    url: loading2,
  },
  {
    name: `${basespace}-error`,
    url: error,
  },
  {
    name: `${basespace}-success`,
    url: success,
  },
  {
    name: `${basespace}-add`,
    url: add,
  },
  {
    name: `${basespace}-minus`,
    url: minus,
  },
  {
    name: `${basespace}-arrows-top`,
    url: arrowsTop,
  },
  {
    name: `${basespace}-arrows-bottom`,
    url: arrowsBottom,
  },
  {
    name: `${basespace}-eye`,
    url: eye,
  },
  {
    name: `${basespace}-close-eye`,
    url: closeEye,
  },
  {
    name: `${basespace}-clear`,
    url: clear,
  },
];

const getIconCompoents = <T>(
  components: ComponentPlugin<T>[],
): { [key: string]: ComponentPlugin<T> } => {
  const iconComponents: { [key: string]: ComponentPlugin<T> } = {};
  components.forEach(
    component =>
      (iconComponents[(component as { name: string }).name] = component),
  );
  return iconComponents;
};

export { options, getIconCompoents };
