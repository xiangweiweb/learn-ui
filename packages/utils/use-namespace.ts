const defaultNamespace = 'lu';
const statePrefix = 'is-';

/**
*  bem规范：block-name__<element-name>--<modifier-name>_<modifier_value>
*/


function _bem (ns: string, block: string, blockSuffix: string, element: string, modifier: string){
    // 默认是 Block
    let cls = `${ns}-${block}`;
    // 如果存在 Block 后缀，也就是 Block 里面还有 Block，
    // 例如：el-form 下面还有一个 el-form-item
    if(blockSuffix) {
        cls += `-${blockSuffix}`;
    }
    // 如果存在元素
    if(element) {
        cls += `__${element}`;
    }
    // 如果存在修改器
    if(modifier) {
        cls += `--${modifier}`;
    }
    return cls;
}

export const useNamespace = (block: string) => {
    // const ns = useGlobalConfig('ns', defaultNamespace);
    const ns = defaultNamespace;

    // lu-button, lu-form-item
    const getBlock = (blockSuffix = '') => {
        return _bem(ns, block, blockSuffix, '', '');
    }

    // lu-button__label
    const getElement = (element?:string ) => {
        return element ? _bem(ns, block, '', element, '') : '';
    }

    // lu-buttom--primary
    const getModifier = (modifier:string) => {
        return modifier ? _bem(ns, block, '', '', modifier) : '';
    }

    const is : {
        (name: string, state: boolean | undefined): string,
        (name: string): string
    } = (name: string, ...args: [boolean | undefined] | []) => {
        const state = args.length >= 1 ? args[0]! : true;

        return name && state ? `${statePrefix}${name}` : '';
    }

    return {
        namespace: ns,
        getBlock,
        getElement,
        getModifier,
        is
    }
}
