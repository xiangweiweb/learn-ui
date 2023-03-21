import type { PropType } from 'vue';

const UPDATE_MODEL_EVENT = 'update:modelValue';

export const inputEmits = {
    change: (value: string) => {},
    input: (value: string) => {},
    [UPDATE_MODEL_EVENT]: (value: string) => {},
    clear: () => true,
    focus: (event: FocusEvent) => {},
    blur: (event: FocusEvent) => {},
    mouseenter: (event: MouseEvent) => {},
    mouseleave: (event: MouseEvent) => {},
}

export type InputAutoSize = { minRows?: number; maxRows?: number } | boolean;


export const inputProps = {
    placeholder: String,
    clearable: {
        type: Boolean,
        default: false
    },
    modelValue: {
        type: [String, Number],
        default: '',
    },
    type: {
        type: String,
        default: 'text'
    },
    size: {
        type: String,
        default: 'middle',
    },
    autosize: {
        type: [Boolean, Object] as PropType<InputAutoSize>,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    readonly: {
        type: Boolean,
        default: false,
    },
    showWordLimit: {
        type: Boolean,
        default: false,
    }
}

export type InputEmits = typeof inputEmits;
export type InputProps = typeof inputProps;
