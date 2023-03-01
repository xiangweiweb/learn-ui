<template>
    <div :class="ns.getBlock()">
        <slot name="prepend"  :class="ns.getElement('prepend')"></slot>
        <div :class="ns.getElement('warpper')">
            <slot name="prefix"  :class="ns.getElement('prefix')"></slot>

            <input :type="type" :class="ns.getElement('inner')" />

            <slot name="suffix" :class="ns.getElement('suffix')"></slot>
        </div>
        <slot name="append"  :class="ns.getElement('append')"></slot>
    </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useNamespace } from '@learn-ui/utils/use-namespace';
import { inputEmits, inputProps } from './input';

export default defineComponent({
    name: 'lu-input',
    props: inputProps,
    emits: inputEmits,
    setup(props, {emit}) {
        // css
        const ns = useNamespace('input');
        const { type, disabled, readonly, size } = props;
        console.log('size', size);
        const classList = [
            ns.getBlock(),
            ns.getModifier(size),
         ];

        return {
            type,
            disabled,
            readonly,
            ns
        }
    }
});
</script>
