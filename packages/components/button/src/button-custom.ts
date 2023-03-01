import { TinyColor } from '@ctrl/tinycolor';
import { computed } from 'vue';
import type { ButtonProps } from './index';

/**
 * 将color与一个固定的颜色混合
 * @param color
 * @param amount 固定颜色的混合占比
 * @returns
 */
export function darken(color: TinyColor, amount = 20){
    return color.mix('#141414', amount).toString();
}

/**
 * 按钮自定义颜色，还需要自动计算active，disaled的颜色
 * @param props
 */
export function useButtonStyle(props: ButtonProps) {
    return computed(() => {
        const styles: Record<string, string> = {};
        const buttonColor = props.color;
        if(!buttonColor) {
            return styles;
        }
        const color = new TinyColor(buttonColor);

        if(props.type === 'default') {
            styles['--lu-btn-bg-color'] = buttonColor;
            styles['--lu-btn-hover-bg-color'] = color.tint(40).toString();
            styles['--lu-btn-active-bg-color'] = color.tint(60).toString();
            styles['--lu-btn-disabled-bg-color'] = color.tint(80).toString();
        }else if(props.type === 'ghost') {
            styles['--lu-btn-text-color'] = buttonColor;
            styles['--lu-btn-border-color'] = buttonColor;
            styles['--lu-btn-hover-bg-color'] = color.tint(40).toString();
            styles['--lu-btn-active-bg-color'] = color.tint(60).toString();
            styles['--lu-btn-disabled-bg-color'] = color.tint(80).toString();
        }else if(props.type === 'link') {
            styles['--lu-btn-text-color'] = buttonColor;
            styles['--lu-btn-hover-text-color'] = color.tint(40).toString();
        }
        // console.log(styles);
        return styles;
    });
}
