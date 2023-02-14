<template>
  <button
    ref="_ref"
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

        const { size, disabled } = toRefs(props);
        console.log('size: ', size.value);
        console.log('disabled: ' , disabled.value);
    }
})
</script>
