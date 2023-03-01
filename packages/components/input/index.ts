import type { App } from 'vue';
import LUInput from './src/input.vue';

LUInput.install = (app: App) => {
    app.component(LUInput.name, LUInput);
};

export default LUInput;

export type InputInstance = InstanceType<typeof LUInput>;
export type { InputProps, InputEmits } from './src/input';
