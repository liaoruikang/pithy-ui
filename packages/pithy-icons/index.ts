import installer from './installer';
import { version } from './version';

export * from './installer';

export default {
  ...installer,
  version,
};
