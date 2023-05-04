import { Plugin, App, Component, ComponentOptions } from 'vue';
import { globalOptions } from './globalOption';

export type optionType = 'component' | 'icons';

const replaceComponentName = (componentNname: string): string => {
  return componentNname.replace(/^s-/, globalOptions.namespace + '-');
};

export const registerComponent = (
  app: App,
  component: Component,
  type: optionType,
): void => {
  let componentNname = (component.name ??
    (component as ComponentOptions).__file) as string;

  if (globalOptions.namespace && globalOptions.type === type) {
    componentNname = replaceComponentName(componentNname);
  }
  app.component(componentNname, component);
};

export const withInstall = (
  component: Component,
  type: optionType,
): Component => {
  (component as Plugin).install = (app: App): void =>
    registerComponent(app, component, type);
  return component;
};

export const withInstallAll = (
  app: App,
  components: Component[],
  type: optionType,
): void => {
  components.forEach(component => registerComponent(app, component, type));
};
