import { defineComponent, Component, h, VNode } from 'vue';

const map = new Map<string, VNode>();

export default (name: string, url: string): Component => {
  return defineComponent({
    name,
    setup() {
      let vnode: VNode | undefined;
      if (!map.has(url)) {
        vnode = toVnode(getSvgElement(url)) as VNode;
        map.set(url, vnode);
      } else {
        vnode = map.get(url);
      }
      return () => vnode;
    },
  });
};

const toVnode = (el: HTMLElement | SVGElement): VNode | string | null => {
  if (el.nodeType === 3) {
    return el.textContent;
  }
  const props: { [key: string]: any } = {};
  for (const attr of el.attributes) {
    props[attr.nodeName] = attr.nodeValue;
  }
  const children = Array.from(el.childNodes).map(el =>
    toVnode(el as HTMLElement),
  );
  return h(el.tagName.toLowerCase(), props, children);
};

const getSvgElement = (url: string): SVGElement => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);
  xhr.send();
  const el = document.createElement('span');
  el.innerHTML = xhr.responseText;
  return el.querySelector('svg')?.cloneNode(true) as SVGElement;
};
