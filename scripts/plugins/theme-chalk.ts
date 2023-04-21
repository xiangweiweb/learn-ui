import type { Plugin } from 'rollup';


export default function ThemeChalk(): Plugin {
    const themeChalk = 'theme-chalk';
    const PKG_NAME = '@learn-ui';
    const sourceThemeChalk = PKG_NAME + '/' + themeChalk;
    return {
        name: 'theme-chalk-plugin',
        resolveId(id) {
            console.log('theme-chalk-plugin: ' + id);
            // 如果文件不是theme开头的 返回
            if(!id.startsWith(sourceThemeChalk)) {
                return;
            }
            return {
                id: id,
                external: 'absolute'
            }
        }
    }
}
