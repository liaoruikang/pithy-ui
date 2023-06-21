declare module '*.vue' {
  import { ComponentOptions } from 'vue';
  const componentOptions: ComponentOptions;
  export default componentOptions;
}

declare const process: {
  env: {
    NODE_ENV: string;
  };
};
