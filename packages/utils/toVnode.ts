import { h, VNode } from 'vue';

export const toVnode = (el: Element): VNode | string | null => {
  if (!el) return el;
  if (el.nodeType === 3) {
    return el?.textContent;
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
