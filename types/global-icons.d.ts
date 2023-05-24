import {
  PtError,
  PtLoading,
  PtLoading2,
  PtMoon,
  PtSuccess,
  PtSun,
} from '@pithy-ui/icons';

declare module 'vue' {
  export interface GlobalComponents {
    PtError: typeof PtError;
    PtLoading: typeof PtLoading;
    PtLoading2: typeof PtLoading2;
    PtMoon: typeof PtMoon;
    PtSuccess: typeof PtSuccess;
    PtSun: typeof PtSun;
  }
}
