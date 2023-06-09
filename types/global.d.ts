import { PtIcon, PtSwitch, PtForm, PtFormItem } from 'pithy-ui';
declare module 'vue' {
  export interface GlobalComponents {
    PtIcon: typeof PtIcon;
    PtSwitch: typeof PtSwitch;
    PtForm: typeof PtForm;
    PtFormItem: typeof PtFormItem;
  }
}
