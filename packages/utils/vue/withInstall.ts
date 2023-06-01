import { Plugin, App, Component } from 'vue';

export type ComponentPlugin<T> = T & Plugin;

export const registerComponent = <T, E extends Record<string, any>>(
  app: App,
  component: ComponentPlugin<T>,
): void => {
  const componentNname = ((component as ComponentPlugin<T> & E).name ??
    (component as ComponentPlugin<T> & E).__file) as string;
  app.component(componentNname, component);
};

export const withInstall = <T>(component: T): ComponentPlugin<T> => {
  (component as ComponentPlugin<T>).install = (app: App): void =>
    registerComponent(app, component as ComponentPlugin<T>);
  return component as ComponentPlugin<T>;
};

export const withInstallAll = (app: App, components: Component[]): void => {
  components.forEach(<T>(component: Component) =>
    registerComponent(app, component as ComponentPlugin<T>),
  );
};
