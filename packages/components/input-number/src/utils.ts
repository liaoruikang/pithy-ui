import type { ModelValue } from '@pithy-ui/hooks';
import type { ComputeType } from './types';

export const computeNumber = (
  num1: ModelValue,
  num2: ModelValue,
  type: ComputeType,
) => {
  const int1 = BigInt(Number(num1) * 10 ** 17);
  const int2 = BigInt(Number(num2) * 10 ** 17);
  let sum = BigInt(0);
  if (type === 'increase') {
    sum = int1 + int2;
  } else if (type === 'decrease') {
    sum = int1 - int2;
  }
  return (Number(sum) / 10 ** 17).toString();
};
