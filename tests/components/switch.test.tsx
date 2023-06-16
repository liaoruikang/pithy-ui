import { PtSwitch } from 'pithy-ui';
import { Bem } from '@pithy-ui/utils';
import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { AXIOM, AXIOM2 } from '../utils';

describe('switch', () => {
  const ns = new Bem('switch');

  test('render test', async () => {
    const testValue = ref<boolean | string | number>(true);
    const wrapper = mount(() => (
      <PtSwitch v-model={testValue.value}></PtSwitch>
    ));
    const checkWrapper = wrapper.find(`.${ns.e('check')}`);
    const buttonWrapper = wrapper.find(`.${ns.e('box')}`);
    expect(checkWrapper.classes()).toMatch(ns.is('active'));
    await buttonWrapper.trigger('click');
    expect(checkWrapper.classes()).not.toMatch(ns.is('active'));
    expect(testValue.value).toBe(false);
  });

  test('value prop test', async () => {
    const testValue = ref<boolean | string | number>(true);
    const wrapper = mount(() => (
      <PtSwitch
        value={testValue.value}
        onChange={val => (testValue.value = val)}></PtSwitch>
    ));
    const checkWrapper = wrapper.find(`.${ns.e('check')}`);
    expect(checkWrapper.classes()).toMatch(ns.is('active'));
    testValue.value = false;
    await nextTick();
    expect(checkWrapper.classes()).not.toMatch(ns.is('active'));
    const buttonWrapper = wrapper.find(`.${ns.e('box')}`);
    await buttonWrapper.trigger('click');
    expect(checkWrapper.classes()).toMatch(ns.is('active'));
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
    const checkWrapper = wrapper.find(`.${ns.e('check')}`);
    testValue.value = '1';
    await nextTick();
    expect(checkWrapper.classes()).toMatch(ns.is('active'));
    testValue.value = '0';
    await nextTick();
    expect(checkWrapper.classes()).not.toMatch(ns.is('active'));
  });

  test('active-text and inactive-text prop test', async () => {
    const wrapper = mount(() => (
      <PtSwitch activeText={AXIOM} inactiveText={AXIOM2}></PtSwitch>
    ));
    const activeWrapper = wrapper.find(`.${ns.e('active')}`);
    const inactiveWrapper = wrapper.find(`.${ns.e('inactive')}`);
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
    const buttonWrapper = wrapper.find(`.${ns.e('box')}`);
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
    const checkAnimationWrapper = wrapper.find(`.${ns.e('check')}`);
    expect(checkAnimationWrapper.classes()).not.toMatch(ns.is('animation'));
    const buttonWrapper = wrapper.find(`.${ns.e('box')}`);
    await buttonWrapper.trigger('click');
    expect(testValue.value).toBe(false);
    expect(wrapper.classes()).toMatch(ns.is('disabled'));
  });
});
