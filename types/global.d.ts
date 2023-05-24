import { PtIcon, PtSwitch } from 'pithy-ui';
declare module 'vue' {
  export interface GlobalComponents {
    PtIcon: typeof PtIcon;
    PtSwitch: typeof PtSwitch;
  }
}
