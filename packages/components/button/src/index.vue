<template>
  <button
    ref="_ref"
    :class="classList"
    :style="style"
    :disabled="disabled || loading"
    @click="handleClick">
    <span v-if="loading">
        加载中...
    </span>
    <slot></slot>
  </button>
</template>
<!--
    link支持
    自定义颜色支持
-->
<script lang="ts">
import { defineComponent, computed, toRefs, inject } from 'vue';
import { useNamespace  } from '@learn-ui/utils/use-namespace';
import { buttonEmits, buttonProps } from './index';
import { useButtonStyle } from './button-custom';

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

        const { size, type, colorType, loading, block } = toRefs(props);

        // css
        const ns = useNamespace('button');
        // 1. class
        const classList = [
            ns.getBlock(),
            ns.getModifier(type.value),
            ns.getModifier(size.value),
            ns.is('loading', loading.value),
            ns.is('block', block.value),
        ];
        // 2. style
        const style = useButtonStyle(props);
        if(!props.color) {
            classList.push(ns.getModifier(colorType.value));
        }
        return {
            handleClick,
            classList,
            style,
        }
    }
})
</script>
