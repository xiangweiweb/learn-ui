<template>
    <div :class="blockCls">
        <slot name="prepend"  :class="ns.getElement('prepend')"></slot>
        <div :class="wrapperCls">
            <slot name="prefix"  :class="ns.getElement('prefix')"></slot>

            <input :type="type"
                :class="ns.getElement('inner')"
                :placeholder="placeholder"
                @focus="handleFocus"
                @blur="handleBlur"/>

            <slot name="suffix" :class="ns.getElement('suffix')"></slot>
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
        const handleFocus = (event: FocusEvent) => {
            focused.value = true;
            emit('focus', event);
        };
        const handleBlur = (event: FocusEvent) => {
            focused.value = false;
            emit('blur', event);
        }

        const blockCls = [
            ns.getBlock(),
            ns.getModifier(size),
        ];
        const wrapperCls = computed(() => [
            ns.getElement('wrapper'),
            ns.is('focus', focused.value)
        ]);

        return {
            type,
            disabled,
            readonly,
            placeholder,
            ns,
            blockCls,
            wrapperCls,
            handleFocus,
            handleBlur,
        }
    }
});
</script>
