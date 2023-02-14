import type { App } from 'vue';
import LUButton from './src/index.vue';

LUButton.install = (app: App) => {
    app.component(LUButton.name, LUButton);
}

export default LUButton;


// 类型
export type ButtonInstance = InstanceType<typeof LUButton>;
export type { ButtonProps, ButtonType, ButtonEmits, ButtonSize }   from './src/index';
