const defaultNamespace = 'lu';
const statePrefix = 'is-';

/**
*  bem规范：block-name__<element-name>--<modifier-name>_<modifier_value>
*/


/**
 *
 * @param namespace
 * @param block
 * @param blockSuffix
 * @param element
 * @param modifier
 * @returns
 */
const _bem = (namespace: string, block: string, blockSuffix: string, element: string, modifier: string) => {
    // 默认是 Block
    let cls = `${namespace}-${block}`;
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
    // const namespace = useGlobalConfig('namespace', defaultNamespace);
    const namespace = defaultNamespace;

    // lu-button, lu-form-item
    const getBlock = (blockSuffix = '') => {
        return _bem(namespace, block, blockSuffix, '', '');
    }

    // lu-button__label
    const getElement = (element?:string ) => {
        return element ? _bem(namespace, block, '', element, '') : '';
    }

    // lu-buttom--primary
    const getModifier = (modifier:string) => {
        return modifier ? _bem(namespace, block, '', '', modifier) : '';
    }

    const is : {
        (name: string, state: boolean | undefined): string,
        (name: string): string
    } = (name: string, ...args: [boolean | undefined] | []) => {
        const state = args.length >= 1 ? args[0]! : true;

        return name && state ? `${statePrefix}${name}` : '';
    }

    return {
        namespace,
        getBlock,
        getElement,
        getModifier,
        is
    }
}
