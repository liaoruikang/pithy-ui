import {
  defineComponent,
  Component,
  VNode,
  PropType,
  isVNode,
  watchEffect,
} from 'vue';
import { isString } from '@swift/utils/vue';
import { toVnode } from '@swift/utils';

const map = new Map<string, VNode>();

export const createIconComponent = (): Component => {
  return defineComponent({
    props: {
      icon: {
        type: [SVGElement, String, Object] as PropType<
          (SVGElement | string | VNode)[]
        >,
        required: true,
      },
    },
    setup(props) {
      let vnode: VNode | null = null;
      watchEffect(() => {
        if (isString(props.icon)) {
          if (props.icon.includes('/')) {
            vnode = toVnode(getSvgElement(props.icon)) as VNode;
          } else {
            vnode = toVnode(document.querySelector(props.icon)) as VNode;
          }
        } else if (props.icon instanceof SVGElement) {
          vnode = toVnode(props.icon) as VNode;
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

export default (name: string, url: string): Component => {
  return defineComponent({
    name,
    components: { customIconComponent },
    setup() {
      let vnode: VNode | null = null;

      if (!map.has(url)) {
        vnode = toVnode(getSvgElement(url)) as VNode;
        map.set(url, vnode);
      } else {
        vnode = map.get(url) as VNode;
      }

      return () => <customIconComponent icon={vnode} />;
    },
  });
};

export const getSvgElement = (url: string): SVGElement => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);
  xhr.send();
  const el = document.createElement('span');
  el.innerHTML = xhr.responseText;
  return el.querySelector('svg')?.cloneNode(true) as SVGElement;
};
