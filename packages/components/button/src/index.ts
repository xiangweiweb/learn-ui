import type { ExtractPropTypes, PropType } from 'vue';


export type ButtonType = 'default' | 'primary' | 'ghost' | 'text' | 'link';
export type ButtonSize = 'large' | 'middle' | 'small';
export type ButtonColor = 'primary' | 'danger' | 'info';

export const buttonEmits = {
    click: (event: MouseEvent) => event instanceof MouseEvent
};
export type ButtonEmits = typeof buttonEmits;



export const buttonProps = {
    size: {
        type: String as PropType<ButtonSize>,
        default: 'default'
    },
    type: {
        type: String as PropType<ButtonType>,
        default: 'middle'
    },
    colorType: {
        type: String as PropType<ButtonColor>,
        default: 'primary',
    },
    disabled: Boolean,
    block: Boolean,
    loading: Boolean,
} as const;
export type ButtonProps = ExtractPropTypes<typeof buttonProps>;


