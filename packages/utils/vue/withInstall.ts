import { Plugin, App, Component } from 'vue';
import { basespace, globalOptions } from './globalOption';

export type ComponentPlugin<T> = T & Plugin;

const replaceComponentName = (componentNname: string): string => {
  const reg = RegExp(`^${basespace}-`);
  return componentNname.replace(reg, globalOptions.namespace + '-');
};

export const registerComponent = <T, E extends Record<string, any>>(
  app: App,
  component: ComponentPlugin<T>,
): void => {
  let componentNname = ((component as ComponentPlugin<T> & E).name ??
    (component as ComponentPlugin<T> & E).__file) as string;
  if (globalOptions.namespace) {
    componentNname = replaceComponentName(componentNname);
  }
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
