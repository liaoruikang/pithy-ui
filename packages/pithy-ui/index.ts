import installer from './installer';
import { version } from './version';

export * from './installer';
export * from '@pithy-ui/hooks';

export default {
  ...installer,
  version,
};
