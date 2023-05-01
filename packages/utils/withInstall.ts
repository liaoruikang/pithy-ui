import { Plugin, App, Component, ComponentOptions } from 'vue';

export const registerComponent = (app: App, component: Component): void => {
  app.component(
    (component.name ?? (component as ComponentOptions).__file) as string,
    component,
  );
};

export const withInstall = (component: Component): Component => {
  (component as Plugin).install = (app: App): void =>
    registerComponent(app, component);
  return component;
};

export const withInstallAll = (app: App, components: Component[]): void => {
  components.forEach(component => registerComponent(app, component));
};
