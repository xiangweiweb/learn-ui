/**
 * 将less文件打包成css文件
 * 一个所有样式的index.css，打包后放到根目录的dist
 *
 * 组件的style文件中，按需加载使用的index.ts中有引入src/base.less，所以chalk中的style文件中不需要@import，不然会将内容打入每个css文件中，造成重复代码
 *
 * gulp --config gulpfile.ts, 执行会报错
 *      SyntaxError: Cannot use import statement outside a module
 *       at wrapSafe (internal/modules/cjs/loader.js:1001:16)
 * 因为gulp的config应该是js，这里需要使用@esbuild-kit/cjs-loader
 *
 */
import path from 'path';
import { dest, src, parallel } from 'gulp';
import less from 'gulp-less';
import rename from 'gulp-rename'

const distFolder = path.resolve(__dirname, 'dist');
// 发布时需要的文件
const distBundle = path.resolve(__dirname, '../', '../' , 'dist/learn-ui/theme-chalk');

function lessToCss() {
    const noElPrefixFile = /(index|base)/;
    // 只打包src下级文件，再下级等会包含在子文件中，不需要单独打包
    return src('./src/*.less')
        .pipe(less())
        .pipe(
            rename((path) => {
              if (!noElPrefixFile.test(path.basename)) {
                path.basename = `lu-${path.basename}`;
              }
            })
        )
        .pipe(dest('./dist'))
}

/**
 * copy from packages/theme-chalk/dist to dist/learn-ui/theme-chalk
 */
function copyDist() {
    return src(`${distFolder}/**`).pipe(dest(distBundle));
}

/**
 * copy source files to dist/learn-ui/theme-chalk/src
 * @returns
 */
function copySource() {
    return src(path.resolve(__dirname, 'src/**'))
        .pipe(dest(path.resolve(distBundle, 'src')));
}

const build = parallel(lessToCss, copyDist, copySource);

export default build;
