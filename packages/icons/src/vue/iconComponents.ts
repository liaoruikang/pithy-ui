import sun from '../svg/sun.svg';
import moon from '../svg/moon.svg';
import { Component } from 'vue';

const options = [
  {
    name: 'ef-sun',
    url: sun,
  },
  {
    name: 'ef-moon',
    url: moon,
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
