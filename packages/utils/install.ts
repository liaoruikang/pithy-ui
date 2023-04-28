import { Plugin, App, Component, ComponentOptions } from 'vue';

export const withInstall = (component: Component): Component => {
  (component as Plugin).install = (app: App): void => {
    app.component(
      (component.name ?? (component as ComponentOptions).__file) as string,
      component,
    );
  };
  return component;
};
