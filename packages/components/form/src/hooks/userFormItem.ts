import { inject, onUnmounted } from 'vue';
import { formItemContextKey } from '../constants';

export const useFormItem = (id: string) => {
  const formItemContext = inject(formItemContextKey, undefined);
  if (formItemContext) {
    formItemContext.appendInputId(id);
    onUnmounted(() => formItemContext.clearInputId(id));
  }

  return async () =>
    formItemContext?.props.value.validateTrigger === 'blur' &&
    formItemContext?.validate();
};
