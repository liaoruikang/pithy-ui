import { isString } from './typeGuard';

export class PithyUiError extends Error {
  constructor(type: 'warn' | 'error', message: string) {
    super(message);
    this.name = `[pithy-ui ${type}]`;
  }
}

export function debugWarn(scope: Error | string) {
  if (process.env.NODE_ENV === 'production') return;
  const error: Error = isString(scope)
    ? new PithyUiError('warn', scope)
    : scope;
  console.warn(error);
}

export function debugError(scope: Error | string) {
  if (process.env.NODE_ENV === 'production') return;
  const error: Error = isString(scope)
    ? new PithyUiError('error', scope)
    : scope;
  console.error(error);
}
