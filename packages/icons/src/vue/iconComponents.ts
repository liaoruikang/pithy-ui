import sun from '../svg/sun.svg';
import moon from '../svg/moon.svg';
import loading from '../svg/loading.svg';
import loading2 from '../svg/loading2.svg';
import error from '../svg/error.svg';
import success from '../svg/success.svg';
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
