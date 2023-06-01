import { PtSwitch } from 'pithy-ui';
import { b, s } from '@pithy-ui/utils/vue';
import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { AXIOM, AXIOM2 } from '../utils';

describe('switch', () => {
  test('render test', async () => {
    const testValue = ref<boolean | string | number>(true);
    const wrapper = mount(() => (
      <PtSwitch v-model={testValue.value}></PtSwitch>
    ));
    const checkWrapper = wrapper.find(`.${b('switch', 'check')}`);
    const buttonWrapper = wrapper.find(`.${b('switch', 'box')}`);
    expect(checkWrapper.classes()).toMatch(s('active'));

    await buttonWrapper.trigger('click');
    expect(checkWrapper.classes()).not.toMatch(s('active'));
    expect(testValue.value).toBe(false);
  });

  test('value prop test', async () => {
    const testValue = ref<boolean | string | number>(true);
    const wrapper = mount(() => (
      <PtSwitch
        value={testValue.value}
        onChange={val => (testValue.value = val)}></PtSwitch>
    ));
    const checkWrapper = wrapper.find(`.${b('switch', 'check')}`);
    expect(checkWrapper.classes()).toMatch(s('active'));
    testValue.value = false;
    await nextTick();
    expect(checkWrapper.classes()).not.toMatch(s('active'));
    const buttonWrapper = wrapper.find(`.${b('switch', 'box')}`);
    await buttonWrapper.trigger('click');
    expect(checkWrapper.classes()).toMatch(s('active'));
    expect(testValue.value).toBe(true);
  });

  test('active-value and inactive-value prop test', async () => {
    const testValue = ref<boolean | string | number>(true);
    const wrapper = mount(() => (
      <PtSwitch
        activeValue='1'
        inactiveValue='0'
        v-model={testValue.value}></PtSwitch>
    ));
    const checkWrapper = wrapper.find(`.${b('switch', 'check')}`);
    testValue.value = '1';
    await nextTick();
    expect(checkWrapper.classes()).toMatch(s('active'));
    testValue.value = '0';
    await nextTick();
    expect(checkWrapper.classes()).not.toMatch(s('active'));
  });

  test('active-text and inactive-text prop test', async () => {
    const wrapper = mount(() => (
      <PtSwitch activeText={AXIOM} inactiveText={AXIOM2}></PtSwitch>
    ));
    const activeWrapper = wrapper.find(`.${b('switch', 'active')}`);
    const inactiveWrapper = wrapper.find(`.${b('switch', 'inactive')}`);
    expect(activeWrapper.text()).toBe(AXIOM);
    expect(inactiveWrapper.text()).toBe(AXIOM2);
  });

  test('loading prop test', () => {
    const wrapper = mount(() => <PtSwitch loading></PtSwitch>);
    const loadingWrapper = wrapper.find('.loading-icon');
    const inactiveWrapper = wrapper.find('.inactive-icon');
    const activeWrapper = wrapper.find('.active-icon');
    expect(
      loadingWrapper.isVisible() &&
        !inactiveWrapper.isVisible() &&
        !activeWrapper.isVisible(),
    ).toBe(true);
  });

  test('before-change and before-loading prop test', async () => {
    const testValue = ref<boolean | string | number>(false);
    const beforeChange = (): Promise<boolean> => {
      return new Promise(resolve => {
        setTimeout(() => resolve(true), 1000);
      });
    };
    const change = () => {
      expect(testValue.value).toBe(true);
      expect(loadingWrapper.isVisible()).toBe(false);
    };
    const wrapper = mount(() => (
      <PtSwitch
        v-model={testValue.value}
        beforeChange={beforeChange}
        onChange={change}></PtSwitch>
    ));
    const buttonWrapper = wrapper.find(`.${b('switch', 'box')}`);
    const loadingWrapper = wrapper.find('.loading-icon');
    await buttonWrapper.trigger('click');
    expect(loadingWrapper.isVisible()).toBe(true);
  });
  test('check-animation and disabled prop test', async () => {
    const testValue = ref<boolean | string | number>(false);
    const wrapper = mount(() => (
      <PtSwitch
        checkAnimation={false}
        disabled
        v-model={testValue.value}></PtSwitch>
    ));
    const checkAnimationWrapper = wrapper.find(`.${b('switch', 'check')}`);
    expect(checkAnimationWrapper.classes()).not.toMatch(s('animation'));
    const buttonWrapper = wrapper.find(`.${b('switch', 'box')}`);
    await buttonWrapper.trigger('click');
    expect(testValue.value).toBe(false);
    expect(wrapper.classes()).toMatch(s('disabled'));
  });
});
