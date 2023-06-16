import { defineComponent, VNode, PropType, isVNode, watchEffect } from 'vue';
import { toVnode, isString } from '@pithy-ui/utils';

const map = new Map<string, VNode>();

export const createIconComponent = () => {
  return defineComponent({
    props: {
      icon: {
        type: [SVGElement, String, Object] as PropType<
          SVGElement | string | VNode
        >,
        required: true,
      },
    },
    setup(props, { expose }) {
      expose();
      let vnode: VNode | null = null;
      watchEffect(() => {
        if (isString(props.icon)) {
          vnode = toVnode(getSvgElement(props.icon) as Element) as VNode;
        } else if (props.icon instanceof SVGElement) {
          vnode = toVnode(props.icon as SVGElement) as VNode;
        } else if (isVNode(props.icon)) {
          vnode = props.icon;
        } else {
          vnode = null;
        }
      });

      return () => vnode;
    },
  });
};
const customIconComponent = createIconComponent();

export default (name: string, url: string) => {
  return defineComponent({
    name,
    components: { customIconComponent },
    setup(_, { expose }) {
      expose();

      let vnode: VNode | null = null;

      if (!map.has(url)) {
        vnode = toVnode(getSvgElement(url) as Element) as VNode;
        map.set(url, vnode);
      } else {
        vnode = map.get(url) as VNode;
      }

      return () => <customIconComponent icon={vnode} />;
    },
  });
};

const getSvgElement = (url: string): SVGElement | string => {
  const el = document.createElement('span');
  el.innerHTML = url;
  if (el.querySelector('svg')) {
    return el.querySelector('svg')?.cloneNode(true) as SVGElement;
  } else if (document.querySelector(url)) {
    return document.querySelector(url)?.cloneNode(true) as SVGElement;
  }
  try {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send();
    el.innerHTML = xhr.responseText;
    return el.querySelector('svg')?.cloneNode(true) as SVGElement;
  } catch (error) {
    return '';
  }
};
