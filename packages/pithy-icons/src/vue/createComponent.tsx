import {
  defineComponent,
  VNode,
  PropType,
  isVNode,
  watchEffect,
  ref,
} from 'vue';
import { toVnode, isString, debugError, debugWarn } from '@pithy-ui/utils';

const map = new Set<string>();

export const createIconComponent = () => {
  return defineComponent({
    props: {
      icon: {
        type: [SVGElement, String, Object, null] as PropType<
          SVGElement | string | VNode | null
        >,
        required: true,
      },
    },
    setup(props, { expose }) {
      expose();
      const vnode = ref<VNode | null>(null);
      watchEffect(() => {
        if (isString(props.icon)) {
          getSvgElement(props.icon).then(
            el => (vnode.value = toVnode(el as Element) as VNode),
          );
        } else if (props.icon instanceof SVGElement) {
          vnode.value = toVnode(props.icon as SVGElement) as VNode;
        } else if (isVNode(props.icon)) {
          vnode.value = props.icon;
        } else {
          vnode.value = null;
        }
      });

      return () => vnode.value;
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

      const vnode = ref<string | null>(null);

      if (!map.has(url)) {
        vnode.value = url;
        map.add(url);
      } else {
        vnode.value = [...map].filter(item => url === item)[0];
      }

      return () => <customIconComponent icon={vnode.value} />;
    },
  });
};

const getSvgElement = async (url: string): Promise<SVGElement | string> => {
  const el = document.createElement('span');
  el.innerHTML = url;
  try {
    if (el.querySelector('svg')) {
      return el.querySelector('svg')?.cloneNode(true) as SVGElement;
    } else if (document.querySelector(url)) {
      return document.querySelector(url)?.cloneNode(true) as SVGElement;
    }
  } catch (error) {
    debugWarn(
      'an error occurred while fetching an svg element. the svg element will be fetched remotely.',
    );
  }
  try {
    const res = await fetch(url, {
      method: 'get',
    });
    el.innerHTML = await res.text();
    if (el.querySelector('svg')) {
      return el.querySelector('svg')?.cloneNode(true) as SVGElement;
    }
    return '';
  } catch (error) {
    debugError(
      'cannot get SVG remotely, please check that the path is correct.',
    );
    return '';
  }
};
