import path from 'path';
import { rollup }  from 'rollup';
import type { OutputOptions } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import vuePlugin from 'rollup-plugin-vue';
import fg from 'fast-glob';
import ThemeChalkPlugin from './plugins/theme-chalk';


const pkgRoot = path.resolve(__dirname, '../packages/');
const componentsRoot = path.join(pkgRoot, 'components/');
const componentsPkgJsonPath = path.join(componentsRoot, 'package.json');
const comPkgJson = require(componentsPkgJsonPath);
const distRoot = path.resolve(__dirname, '../dist/learn-ui');

const buildModules = async() => {
    const getInput = async() => {
        const inputs = await fg('**/*.{js,ts,vue}', {
            cwd: pkgRoot,
            absolute: true,
            onlyFiles: true,
        });
        const excludes = ['node_modules', 'dist', 'gulp', 'test'];
        return inputs.filter((filepath) => {
            return !excludes.some(exclude => filepath.includes(exclude));
        });
    };
    // components打包时需要排除的依赖
    const getExternal = (isFull: false) => {
        const dependencies = Object.keys(comPkgJson.dependencies);
        const peerDependencies = Object.keys(comPkgJson.peerDependencies);
        const packages = [...peerDependencies];
        // 打包全部和打包部分时 需要排除不同的依赖
        if(!isFull) {
            packages.push('@vue', ...dependencies);
        }
        const externalDependencies = Array.from(new Set(packages));
        return (id: string) => {
            return externalDependencies.some(dep => id === dep || id.startsWith(`${dep}/`));
        }
    };

    const input = await getInput();
    /**
     * 返回一个 Promise，该 Promise 解析为具有各种属性和方法的 bundle 对象
     */
    const bundle = await rollup({
        input,
        plugins: [
            nodeResolve({
                // 指定插件将操作的文件的扩展名, plugin插件
                extensions: ['.mjs', '.js', '.ts', '.json']
            }),
            vuePlugin(),
            ThemeChalkPlugin(),
        ],
        external: getExternal(false),
    });
    // console.log(bundle.watchFiles);
    const outOptions: OutputOptions[] = [
        {
            format: 'cjs',
            dir: path.join(distRoot, 'lib'),
            entryFileNames: `[name].js`,
            exports: 'named',
            // preserveModules: true,
            // preserveModulesRoot: epRoot,
            sourcemap: true,
        },
        {
            format: 'es',
            dir: path.join(__dirname, 'es'),
            entryFileNames: `[name].mjs`,
            sourcemap: true
        }
    ];

    for(let i = 0; i < outOptions.length; i++) {
        console.log(`i=${i}, format=${outOptions[i].format}`);
        await bundle.write(outOptions[i]);
    }
};

buildModules();
