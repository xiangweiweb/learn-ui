<template>
    <div :class="blockCls">
        <slot name="prepend"  :class="ns.getElement('prepend')"></slot>
        <div :class="wrapperCls">
            <slot name="prefix"  :class="ns.getElement('prefix')"></slot>

            <input :type="type"
                :class="ns.getElement('inner')"
                :value="value"
                :placeholder="placeholder"
                @focus="handleFocus"
                @blur="handleBlur"
                @input="handleInput"
                @change="handleChange"/>
            <span v-if="showClear" :class="ns.getElement('suffix')">
                <slot name="suffix" ></slot>
                <span  v-if="showClear"
                    :class="ns.getElement('clear')"
                    @click="clear">x</span>
            </span>

        </div>
        <slot name="append"  :class="ns.getElement('append')"></slot>
    </div>

</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useNamespace } from '@learn-ui/utils/use-namespace';
import { inputEmits, inputProps } from './input';

export default defineComponent({
    name: 'lu-input',
    props: inputProps,
    emits: inputEmits,
    setup(props, {emit}) {
        // css
        const ns = useNamespace('input');
        const { type, disabled, readonly, size, placeholder } = props;
        const focused = ref(false);
        const hovering = ref(false);
        const handleFocus = (event: FocusEvent) => {
            focused.value = true;
            emit('focus', event);
        };
        const handleBlur = (event: FocusEvent) => {
            focused.value = false;
            emit('blur', event);
        };
        const handleMouseEnter = (evt: MouseEvent) => {
            hovering.value = true
            emit('mouseenter', evt);
        };
        const handleMouseLeave = (evt: MouseEvent) => {
            hovering.value = false
            emit('mouseleave', evt);
        };
        const handleInput = (evt: InputEvent) => {
            const target =  evt.target as HTMLInputElement;
            console.log(target.value, ' input');
            emit('input', target.value);
        };
        const handleChange = (evt: InputEvent) => {
            const target =  evt.target as HTMLInputElement;
            emit('change', target.value);
        };
        const clear = () => {
            emit('input', '');
            emit('change', '');
            emit('clear');
        };

        const blockCls = [
            ns.getBlock(),
            ns.getModifier(size),
        ];
        const wrapperCls = computed(() => [
            ns.getElement('wrapper'),
            ns.is('focus', focused.value)
        ]);

        const showClear = computed(() => {
            const bool = props.clearable &&
                (!!props.value) &&
                (focused.value || hovering.value);
            return bool;
        });

        return {
            type,
            disabled,
            readonly,
            showClear,
            placeholder,
            ns,
            blockCls,
            wrapperCls,
            handleFocus,
            handleBlur,
            handleMouseEnter,
            handleMouseLeave,
            handleInput,
            handleChange,
            clear
        }
    }
});
</script>
