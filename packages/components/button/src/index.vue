<template>
  <button
    ref="_ref"
    :class="classList"
    :disabled="disabled"
    @click="handleClick">
    <span v-if="loading">
        加载中...
    </span>
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, inject } from 'vue';
import { useNamespace  } from '@learn-ui/utils/use-namespace';
import { buttonEmits, buttonProps } from './index';

export default defineComponent({
    name: 'lu-button',
    props: buttonProps,
    emits: buttonEmits,
    setup(props, {emit}) {
        console.log('props:', props);
        const handleClick = (event: MouseEvent) => {
            if(props.disabled || props.loading) {
                event.preventDefault();
                return;
            }
            console.log('click', Date.now());
            emit('click', event);
        }

        const { size, type, disabled, loading, block } = toRefs(props);
        console.log('size: ', size.value);
        console.log('disabled: ' , disabled.value);

        // css
        const ns = useNamespace('button');
        // 1. class
        const classList = [
            ns.getBlock(),
            ns.getModifier(type.value),
            ns.getModifier(size.value),
            ns.is('disabled', disabled.value),
            ns.is('loading', loading.value),
            ns.is('block', block.value),
        ];
        console.log('classList: ', classList);
        // 2. style

        return {
            handleClick,
            classList
        }
    }
})
</script>
