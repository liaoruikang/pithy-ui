import {
  defineComponent,
  Component,
  Suspense,
  h,
  FunctionalComponent,
  defineAsyncComponent,
} from 'vue';

interface Attrs {
  [key: string]: unknown;
}

export default (name: string, url: string): Component => {
  const AsyncIconComponent = createIconComponent(url);

  return defineComponent({
    name,
    setup(props, { attrs }) {
      const property: Attrs = {
        style: {
          fill: 'currentColor',
        },
      };

      return () => (
        <Suspense>
          <AsyncIconComponent {...attrs} {...property}></AsyncIconComponent>
        </Suspense>
      );
    },
  });
};

const createIconComponent = (url: string): FunctionalComponent => {
  return defineAsyncComponent(async () => {
    const vnode = toVnode(await createIconElement(url));
    return vnode;
  });
};

const createIconElement = async (url: string): Promise<SVGElement> => {
  return new Promise(resolve => {
    const objEl = document.createElement('object');
    const onLoad = () => {
      resolve(
        objEl.contentDocument
          ?.querySelector('svg')
          ?.cloneNode(true) as SVGElement,
      );
      objEl.remove();
    };
    objEl.data = url;
    objEl.type = 'image/svg+xml';
    objEl.onload = onLoad;
    objEl.style.position = 'absolute';
    objEl.style.visibility = 'hidden';
    document.body.appendChild(objEl);
  });
};

const toVnode = (el: HTMLElement | SVGElement): any => {
  if (el.nodeType === Node.TEXT_NODE) {
    return el.textContent;
  } else if (el.nodeType === Node.ELEMENT_NODE) {
    const props: Attrs = {};
    for (const attr of el.attributes) {
      props[attr.nodeName] = attr.nodeValue;
    }
    const children = Array.from(el.childNodes).map(el =>
      toVnode(el as HTMLElement),
    );
    return h(el.tagName.toLowerCase(), props, children);
  }
};
