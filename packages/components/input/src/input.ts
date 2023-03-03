export const inputEmits = {
    blur: (event: FocusEvent) => {},
    focus: (event: FocusEvent) => {},
    change: (event: MouseEvent) => {},
    input: (event: MouseEvent) => {},
    clean: (event: MouseEvent) => {},
}

export const inputProps = {
    placeholder: String,
    clearable: {
        type: Boolean,
        default: false
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
