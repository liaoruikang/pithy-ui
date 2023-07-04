import {
  PtError,
  PtLoading,
  PtLoading2,
  PtMoon,
  PtSuccess,
  PtSun,
  PtAdd,
  PtArrowsBottom,
  PtArrowsTop,
  PtMinus,
  PtCloseEye,
  PtEye,
  PtClear,
} from '@pithy-ui/icons';

declare module 'vue' {
  export interface GlobalComponents {
    PtError: typeof PtError;
    PtLoading: typeof PtLoading;
    PtLoading2: typeof PtLoading2;
    PtMoon: typeof PtMoon;
    PtSuccess: typeof PtSuccess;
    PtSun: typeof PtSun;
    PtAdd: typeof PtAdd;
    PtArrowsBottom: typeof PtArrowsBottom;
    PtArrowsTop: typeof PtArrowsTop;
    PtMinus: typeof PtMinus;
    PtCloseEye: typeof PtCloseEye;
    PtEye: typeof PtEye;
    PtClear: typeof PtClear;
  }
}
