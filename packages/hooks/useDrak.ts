import { Ref, ref, watch } from 'vue';

export const useDrak = (initValue = false): Ref<boolean> => {
  const drakValue = ref<boolean>(initValue);

  watch(
    drakValue,
    val => {
      const htmlElement = document.documentElement;

      if (val) {
        htmlElement.classList.add('drak');
      } else {
        htmlElement.classList.remove('drak');
      }
    },
    {
      flush: 'post',
    },
  );

  return drakValue;
};
