<template>
    <div :class="blockCls">
        <slot name="prepend"  :class="ns.getElement('prepend')"></slot>
        <div :class="wrapperCls">
            <slot name="prefix"  :class="ns.getElement('prefix')"></slot>

            <input :type="type"
                :class="ns.getElement('inner')"
                :placeholder="placeholder"
                v-model="inputValue"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="handleChange"/>
            <span v-if="showClear" :class="ns.getElement('suffix')">
                <slot name="suffix" ></slot>
                <span  v-if="showClear"
                    :class="ns.getElement('clear')"
                    @mousedown.prevent="void 0"
                    @click="onClear">x</span>
            </span>

        </div>
        <slot name="append"  :class="ns.getElement('append')"></slot>
    </div>

</template>

<script lang="ts">
import { defineComponent, ref, computed , watchEffect, shallowRef, onMounted} from 'vue';
import { useNamespace } from '@learn-ui/utils/use-namespace';
import { inputEmits, inputProps } from './input';

export default defineComponent({
    name: 'lu-input',
    props: inputProps,
    emits: inputEmits,
    setup(props, {emit}) {
        onMounted(() => {
            console.log('mounted: ', props.modelValue);
        })
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
            hovering.value = true;
            emit('mouseenter', evt);
        };
        const handleMouseLeave = (evt: MouseEvent) => {
            hovering.value = false
            emit('mouseleave', evt);
        };

        const handleChange = (evt: Event) => {
            const target =  evt.target as HTMLInputElement;
            emit('change', target.value);
            console.log('change ', target.value);
        };
        const onClear = () => {
            // 需要阻止事件mousedown，不然input的blur会被触发，click事件不会触发
            emit('update:modelValue', '');
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
                (!!props.modelValue) &&
                (focused.value || hovering.value);
            return bool;
        });
        const inputValue = computed({
            get: () => props.modelValue,
            set: (val) => {
                val = val.toString();
                emit('update:modelValue', val);
                emit('input', val);
            }
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
            inputValue,
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
