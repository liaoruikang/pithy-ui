import sun from '../svg/sun.svg';
import moon from '../svg/moon.svg';
import loading from '../svg/loading.svg';
import loading2 from '../svg/loading2.svg';
import error from '../svg/error.svg';
import success from '../svg/success.svg';
import { Component } from 'vue';

const options = [
  {
    name: 's-sun',
    url: sun,
  },
  {
    name: 's-moon',
    url: moon,
  },
  {
    name: 's-loading',
    url: loading,
  },
  {
    name: 's-loading2',
    url: loading2,
  },
  {
    name: 's-error',
    url: error,
  },
  {
    name: 's-success',
    url: success,
  },
];

interface iconComponent {
  [key: string]: Component;
}

const getIconCompoent = (components: Component[]): iconComponent => {
  const iconComponent: iconComponent = {};

  components.forEach(
    component =>
      (iconComponent[(component as { name: string }).name] = component),
  );

  return iconComponent;
};

export { options, getIconCompoent };
