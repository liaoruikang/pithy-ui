import { mount } from '@vue/test-utils';
import { Bem, basespace } from '@pithy-ui/utils';
import { PtForm, PtFormItem, PtSwitch } from 'pithy-ui';
import type { FormItemProps, FormProps, ValidateResultGroup } from 'pithy-ui';
import { Ref, nextTick, reactive, ref } from 'vue';
import { AXIOM, AXIOM2 } from '../utils';
import { Rule } from 'async-validator';
import { cloneDeep } from 'lodash-unified';

describe('from', () => {
  const ns = new Bem('form');

  const model = reactive({
    number: 1,
    string: AXIOM,
    boolean: true,
    object: {},
    array: [],
  });

  let cloneModel = cloneDeep(model);

  const formInstance = ref<InstanceType<typeof PtForm>>();

  const rules: Partial<Record<keyof typeof model, Rule>> = {
    number: {
      type: 'number',
      required: true,
    },
    boolean: {
      type: 'boolean',
    },
    string: {
      type: 'string',
    },
    object: {
      type: 'object',
    },
    array: {
      type: 'array',
    },
  };

  const wrapper = mount(props => (
    <PtForm model={model} {...props} rules={rules} ref={formInstance}>
      <PtFormItem field='number'>
        <input type='text' v-model={model.number} />
      </PtFormItem>
      <PtFormItem field='boolean'>
        <PtSwitch v-model={model.boolean} />
      </PtFormItem>
      <PtFormItem field='string'>
        <input type='text' v-model={model.string} />
      </PtFormItem>
      <PtFormItem field='object' />
      <PtFormItem field='array' />
    </PtForm>
  ));

  test('render test', async () => {
    const formWrapper = wrapper.findComponent(`.${ns.b()}`);
    expect(formWrapper.exists()).toBe(true);

    const formItemWrappers = wrapper.findAllComponents(`.${ns.b('form-item')}`);
    expect(formItemWrappers.length).toBe(5);
  });

  test('validate function test', async () => {
    let validateResults = await formInstance.value?.validate();

    expect(validateResults?.error).toHaveLength(0);
    expect(validateResults?.success).toHaveLength(5);

    (model.number as unknown) = AXIOM;
    await nextTick();
    validateResults = await formInstance.value?.validate();

    expect(validateResults?.error).toHaveLength(1);
    expect(validateResults?.success).toHaveLength(4);
    (model.number as unknown) = 1;
    await nextTick();
    validateResults = await formInstance.value?.validate();
    expect(validateResults?.error).toHaveLength(0);
    expect(validateResults?.success).toHaveLength(5);
    (model.boolean as unknown) = AXIOM;
    await nextTick();
    validateResults = await formInstance.value?.validate('boolean');
    expect(validateResults?.error).toHaveLength(1);
    expect(validateResults?.success).toHaveLength(0);
  });

  test('clearValidate function test', async () => {
    (model.number as unknown) = AXIOM;
    (model.string as unknown) = 1;
    (model.array as unknown) = AXIOM2;
    (model.object as unknown) = AXIOM2;

    await formInstance.value?.validate();
    const errorClass = ns.bem(
      { element: 'content', modifier: 'error' },
      'modifier',
    );
    let errorWrappers = wrapper.findAll(`.${errorClass}`);
    expect(errorWrappers).toHaveLength(5);
    await formInstance.value?.clearValidate('string');
    errorWrappers = wrapper.findAll(`.${errorClass}`);
    expect(errorWrappers).toHaveLength(4);
    await formInstance.value?.clearValidate();
    errorWrappers = wrapper.findAll(`.${errorClass}`);
    expect(errorWrappers).toHaveLength(0);
  });

  test('resetFields function test', async () => {
    expect(model).not.toStrictEqual(cloneModel);
    await formInstance.value?.resetFields('number');
    expect(model.number).toBe(cloneModel.number);
    expect(model.string).not.toBe(cloneModel.string);
    await formInstance.value?.resetFields();
    expect(model).toStrictEqual(cloneModel);
  });

  test('updateInitialValue function test', async () => {
    (model.boolean as unknown) = AXIOM;
    (model.number as unknown) = AXIOM;
    (model.string as unknown) = 1;
    (model.array as unknown) = AXIOM2;
    (model.object as unknown) = AXIOM2;
    cloneModel = cloneDeep(model);
    await formInstance.value?.updateInitialValue();
    await formInstance.value?.resetFields();
    expect(model).toStrictEqual(cloneModel);
  });

  test('validate event test', async () => {
    await formInstance.value?.validate();
    const formComponent = wrapper.findComponent(PtForm);

    const eventResults = formComponent.emitted('validate');

    expect(eventResults).toBeTruthy();
    expect(eventResults).toHaveLength(6);
    expect((eventResults?.[5][0] as ValidateResultGroup).error).toHaveLength(5);
  });
});

describe('form-item', () => {
  const ns = new Bem('form-item');

  const model = reactive({
    value: AXIOM,
  });

  const rules: Partial<Record<keyof typeof model, Rule>> = reactive({
    value: {
      type: 'boolean',
      validator(_, value, callback) {
        if (!value) callback('false');
        callback();
      },
    },
  });

  const formProps: Partial<FormProps> = reactive({
    size: 1,
    labelFocus: false,
    labelWidth: '100px',
    verticalLabel: true,
    inline: true,
    labelAlign: 'center',
    validateTrigger: 'blur',
    validateAppear: true,
    required: true,
    requiredAsteriskLocation: 'right',
    ruleChangeValidate: true,
  });

  const formItemProps: Ref<Partial<FormItemProps>> = ref({});

  const wrapper = mount(() => (
    <PtForm model={model} {...formProps} rules={rules}>
      <PtFormItem {...formItemProps.value} label='字段1' field='value'>
        <PtSwitch v-model={model.value}></PtSwitch>
      </PtFormItem>
    </PtForm>
  ));
  test('rander test', async () => {
    const formItemWrapper = wrapper.find(`.${ns.b()}`);
    expect(formItemWrapper.exists()).toBe(true);
    const labelTextClass = ns.bem(
      { element: 'label', modifier: 'text' },
      'modifier',
    );
    const labelTextWrapper = wrapper.find(`.${labelTextClass}`);
    expect(labelTextWrapper.text()).toBe('字段1');
  });

  test('props test', async () => {
    const labelTextWrapper = wrapper.find(`.${ns.m('text')}`);
    expect(labelTextWrapper.text()).toBe('字段1');
  });

  test('common props test', async () => {
    const formItemWrapper = wrapper.findComponent(PtFormItem);
    const formItemAttrs = formItemWrapper.attributes();
    const formItemClasses = formItemWrapper.classes();
    const sizeReg = new RegExp(
      `--${basespace}-(width|height)-size\\s?:\\s*1`,
      'g',
    );
    expect(formItemAttrs.style).toMatch(sizeReg);
    expect(formItemClasses).toContain('vertical-label');
    expect(formItemClasses).toContain('inline');

    const labelWrapper = wrapper.find(`.${ns.e('label')}`);
    const labelAttrs = labelWrapper.attributes();
    const labelWidthReg = new RegExp(
      `${ns.cssVar('form-label-width')}\\s?:\\s*100px`,
      'g',
    );
    expect(labelAttrs.style).toMatch(labelWidthReg);
    const labelAlignReg = new RegExp(
      `text-align\\s?:\\s*${formProps.labelAlign}`,
      'g',
    );
    expect(labelAttrs.style).toMatch(labelAlignReg);

    const labelTextWrapper = wrapper.find(`.${ns.m('text')}`);
    const labelTextAttrs = labelTextWrapper.attributes();
    expect(labelTextAttrs).not.toHaveProperty('for');
    expect(labelTextWrapper.classes()).toContain(
      ns.is(`required-${formProps.requiredAsteriskLocation}`),
    );

    const eventResults = formItemWrapper.emitted('validate');
    expect(eventResults).toHaveLength(1);
    const switchBoxWrapper = formItemWrapper.find(
      `.${ns._bem('switch', 'box')}`,
    );
    await switchBoxWrapper.trigger('blur');
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(eventResults).toHaveLength(2);
    (rules.value as any).type = 'number';
    delete (rules.value as any).validator;
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(eventResults).toHaveLength(3);
  });

  test('common props priority test', async () => {
    // const formWrapper = wrapper.find(PtForm);
    formItemProps.value = {
      size: 2,
      labelFocus: true,
      labelWidth: '120px',
      verticalLabel: false,
      inline: false,
      labelAlign: 'left',
      validateTrigger: 'change',
      validateAppear: false,
      required: false,
      requiredAsteriskLocation: 'left',
      ruleChangeValidate: false,
    };
    await nextTick();
    const formItemWrapper = wrapper.findComponent(PtFormItem);
    const formItemAttrs = formItemWrapper.attributes();
    const formItemClasses = formItemWrapper.classes();
    const sizeReg = new RegExp(
      `--${basespace}-(width|height)-size\\s?:\\s*2`,
      'g',
    );
    expect(formItemAttrs.style).toMatch(sizeReg);
    expect(formItemClasses).not.toContain('vertical-label');
    expect(formItemClasses).not.toContain('inline');

    const labelWrapper = wrapper.find(`.${ns.e('label')}`);
    const labelAttrs = labelWrapper.attributes();
    const labelWidthReg = new RegExp(
      `${ns.cssVar('form-label-width')}\\s?:\\s*120px`,
      'g',
    );
    expect(labelAttrs.style).toMatch(labelWidthReg);
    const labelAlignReg = new RegExp(
      `text-align\\s?:\\s*${formItemProps.value.labelAlign}`,
      'g',
    );
    expect(labelAttrs.style).toMatch(labelAlignReg);

    const labelTextWrapper = wrapper.find(`.${ns.m('text')}`);
    const labelTextAttrs = labelTextWrapper.attributes();
    expect(labelTextAttrs).toHaveProperty('for');
    expect(labelTextWrapper.classes()).not.toContain(
      ns.is(`required-${formProps.requiredAsteriskLocation}`),
    );

    const switchBoxWrapper = formItemWrapper.find(
      `.${ns._bem('switch', 'box')}`,
    );
    await switchBoxWrapper.trigger('blur');
    await new Promise(resolve => setTimeout(resolve, 100));
    const eventResults = formItemWrapper.emitted('validate');
    expect(eventResults).toHaveLength(3);
    (rules.value as any).type = 'number';
    delete (rules.value as any).validator;
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(eventResults).toHaveLength(3);
  });
});
