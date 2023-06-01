import { PtIcon } from 'pithy-ui';
import { PtMoon } from '@pithy-ui/icons';
import { moon } from '@pithy-ui/icons/src/svg';
import { h } from 'vue';
import { AXIOM } from '../utils';
import { mount } from '@vue/test-utils';

describe(PtIcon.name, () => {
  test('render test', () => {
    const wrapper = mount(() => (
      <PtIcon>
        <PtMoon></PtMoon>
      </PtIcon>
    ));
    const moon = wrapper.findComponent(PtMoon);
    expect(moon.exists()).toBe(true);
  });
  test('color prop test', () => {
    const wrapper = mount(() => (
      <PtIcon color='red'>
        <PtMoon></PtMoon>
      </PtIcon>
    ));
    expect(wrapper.attributes('style')).toMatch(/color:\s?red/);
  });
  test('font-size prop test', () => {
    const wrapper = mount(() => (
      <PtIcon size='2em'>
        <PtMoon></PtMoon>
      </PtIcon>
    ));
    expect(wrapper.attributes('style')).toMatch(/font-size:\s?2em/);
  });
  test('custom-icon prop test', () => {
    // string
    let wrapper = mount(() => <PtIcon customIcon={moon}></PtIcon>);
    let svg = wrapper.find('svg');
    expect(svg.exists()).toBe(true);

    // vnode
    const vnode = h(
      'svg',
      {
        fill: 'currentColor',
      },
      [h('text', null, AXIOM)],
    );
    wrapper = mount(() => <PtIcon customIcon={vnode}></PtIcon>);
    svg = wrapper.find('svg');
    expect(svg.exists()).toBe(true);
    const text = svg.find('text');
    expect(text.exists()).toBe(true);
    expect(text.text()).toBe(AXIOM);
  });
});
