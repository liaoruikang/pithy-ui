<template>
  <div class="ef-switch">
    <span
      class="ef-switch__inactive"
      :class="{
        'is-active': !activeState,
      }"
      >关闭</span
    >
    <button class="ef-switch__box" @click="change">
      1321321
      <span
        class="ef-switch__check"
        :class="{
          'is-active': activeState,
        }">
        <EfIcon>
          <slot name="check-active">
            <ef-success v-show="activeState"></ef-success>
          </slot>
          <slot name="check-inactive">
            <ef-error v-show="!activeState"></ef-error>
          </slot>
        </EfIcon>
      </span>
    </button>
    <span
      class="ef-switch__active"
      :class="{
        'is-active': activeState,
      }"
      >开启</span
    >
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { switchProps, switchEmits } from '.';
import EfIcon from '../../icon';
import { EfSuccess, EfError } from '@effortless-design/icons';

export default defineComponent({
  name: 'ef-switch',
  props: switchProps,
  emits: switchEmits,
  components: { EfIcon, EfSuccess, EfError },
  setup(props, { emit }) {
    const active = computed({
      get(): boolean | string | number {
        return props.modelValue;
      },
      set(value: boolean | string | number) {
        emit('update:model-value', value);
      },
    });

    const activeState = computed(() => active.value == props.activeValue);

    const change = () => {
      active.value =
        active.value == props.activeValue
          ? props.inactiveValue
          : props.activeValue;
    };
    return { active, change, activeState };
  },
});
</script>
