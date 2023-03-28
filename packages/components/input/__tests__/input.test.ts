import { ref, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, test, expect, vi } from 'vitest';
import Input from '../index';

describe('props', () => {

    test('modelValue&placeholder', async () => {
        const wrapper = mount(Input, {
            props: {
                modelValue: 'input',
                placeholder: 'test'
            }
        });
        const inputElement = wrapper.find('input');
        const nativeInput = inputElement.element;
        expect(nativeInput.placeholder).toMatchInlineSnapshot(`"test"`);
        expect(nativeInput.value).toMatchInlineSnapshot(`"input"`);

        wrapper.setProps({ modelValue: 'text' });
        await nextTick();
        expect(inputElement.element.value).toMatchInlineSnapshot(`"text"`);
    });


    test('props: showWordLimit&maxlength', async () => {
        const wrapper = mount(Input, {
            props: {
                maxlength: 10,
                showWordLimit: true,
            }
        });
        await nextTick();

        // maxlength
        const inputElm = wrapper.find('input');
        const nativeInput = inputElm.element;
        expect(nativeInput.maxLength).toMatchInlineSnapshot(`10`);

        const node = wrapper.find('.lu-input__count');
        expect(node.exists()).toBe(true);
        expect(node.text()).toBe('0 / 10');

        wrapper.setProps({
            modelValue: '12345',
        });
        await nextTick();
        const node2 = wrapper.find('.lu-input__count');
        expect(node2.text()).toBe('5 / 10');
    });

});



describe('emits', () => {

    test('focus', async () => {
        const input = ref('input');
        const handleFocus = vi.fn();
        const wrapper = mount(Input, {
            props: {
                onFocus: handleFocus,
                modelValue: input.value
            }
        });
        const inputElement = wrapper.find('input');
        await inputElement.trigger('focus');

        expect(inputElement.exists()).toBe(true);
        expect(handleFocus).toHaveBeenCalled();
    });

});
