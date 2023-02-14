import type { ExtractPropTypes, PropType } from 'vue';


export type ButtonType = 'default' | 'primary' | 'ghost' | 'text' | 'link';
export type ButtonSize = 'large' | 'default' | 'small';

export const buttonEmits = {
    click: (event: MouseEvent) => event instanceof MouseEvent
};
export type ButtonEmits = typeof buttonEmits;


export const buttonProps = {
    size: String as PropType<ButtonSize>,
    type: {
        type: String as PropType<ButtonType>
    },
    disabled: Boolean,
    block: Boolean,
    loading: Boolean,
} as const;
export type ButtonProps = ExtractPropTypes<typeof buttonProps>;


