<template>
    <div :class="blockCls"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave">
        <template v-if="type!=='textarea'">
            <slot name="prepend"  :class="ns.getElement('prepend')"></slot>
            <div :class="wrapperCls">
                <slot name="prefix"  :class="ns.getElement('prefix')"></slot>

                <input :type="type"
                    :class="ns.getElement('inner')"
                    :placeholder="placeholder"
                    v-bind="$attrs"
                    v-model="inputValue"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    @change="handleChange"/>
                <span v-if="showClear || isWordLimitVisible" :class="ns.getElement('suffix')">
                    <span  :class="ns.getElement('suffix-inner')">
                        <template v-if="!showClear && !isWordLimitVisible">
                            <slot name="suffix" ></slot>
                        </template>
                        <span v-if="showClear"
                            :class="ns.getElement('clear')"
                            @mousedown.prevent="void 0"
                            @click="onClear">x</span>
                        <span v-if="isWordLimitVisible" :class="ns.getElement('count')">
                            {{ textLength }} / {{ $attrs.maxlength }}
                        </span>
                    </span>
                </span>
            </div>
            <slot name="append"  :class="ns.getElement('append')"></slot>
        </template>

        <template v-else>
            <textarea ref="textarea"
                :class="nsTextarea.getElement('inner')"
                :placeholder="placeholder"
                v-bind="$attrs"
                v-model="inputValue"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="handleChange">
            </textarea>
            <span v-if="isWordLimitVisible" :class="nsTextarea.getElement('count')">
                {{ textLength }} / {{ $attrs.maxlength }}
            </span>
        </template>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, useAttrs } from 'vue';
import { useNamespace } from '@learn-ui/utils/use-namespace';
import { inputEmits, inputProps } from './input';

export default defineComponent({
    name: 'lu-input',
    inheritAttrs: false,
    props: inputProps,
    emits: inputEmits,
    setup(props, {emit}) {
        // css
        const ns = useNamespace('input');
        const nsTextarea = useNamespace('textarea');
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
            hovering.value = true;
            emit('mouseenter', evt);
        };
        const handleMouseLeave = (evt: MouseEvent) => {
            hovering.value = false;
            emit('mouseleave', evt);
        };

        const handleChange = (evt: Event) => {
            const target =  evt.target as HTMLInputElement;
            emit('change', target.value);
        };
        const onClear = () => {
            // 需要阻止事件mousedown，不然input的blur会被触发，click事件不会触发
            emit('update:modelValue', '');
            emit('input', '');
            emit('change', '');
            emit('clear');
        };

        const blockCls = computed(() => {
            const list = [ type === 'textarea' ? nsTextarea.getBlock() : ns.getBlock() ];
            if(type !== 'textarea') {
                list.push(ns.getModifier(size));
            }
            return list;
        });
        const wrapperCls = computed(() => [
            ns.getElement('wrapper'),
            ns.is('focus', focused.value)
        ]);

        const showClear = computed(() => {
            const bool = props.clearable &&
                (!!props.modelValue) &&
                (focused.value || hovering.value);
            return bool;
        });
        // 实现v-model双向绑定
        const inputValue = computed({
            get: () => props.modelValue,
            set: (val) => {
                val = val.toString();
                emit('update:modelValue', val);
                emit('input', val);
            }
        });
        const textLength = computed(() => {
            const str = props.modelValue ? props.modelValue.toString() : '';
            return str.length;
        });
        const attrs = useAttrs();
        const isWordLimitVisible = computed(() => {
            return props.showWordLimit &&
            !!attrs.maxlength &&
            !disabled &&
            !readonly
        });

        return {
            type,
            disabled,
            readonly,
            showClear,
            placeholder,
            ns,
            nsTextarea,
            blockCls,
            wrapperCls,
            inputValue,
            isWordLimitVisible,
            textLength,
            handleFocus,
            handleBlur,
            handleMouseEnter,
            handleMouseLeave,
            handleChange,
            onClear,
        }
    }
});
</script>
