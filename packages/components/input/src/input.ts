export const inputEmits = {
    change: (value: string) => {},
    input: (value: string) => {},
    clear: () => true,
    focus: (event: FocusEvent) => {},
    blur: (event: FocusEvent) => {},
    mouseenter: (event: MouseEvent) => {},
    mouseleave: (event: MouseEvent) => {},
}

export const inputProps = {
    placeholder: String,
    clearable: {
        type: Boolean,
        default: false
    },
    value: {
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
        type: Boolean,
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
    'max-length': Number,
    'show-word-limit': Boolean
}

export type InputEmits = typeof inputEmits;
export type InputProps = typeof inputProps;
