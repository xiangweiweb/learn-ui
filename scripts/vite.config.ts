import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dtsPlugin from 'vite-plugin-dts';

const distDir = path.resolve(__dirname, '../dist/learn-ui');

export default defineConfig({
    plugins: [
        vue(),
        dtsPlugin({
            skipDiagnostics: false,
            cleanVueFileName: true,
            exclude: ['node_modules'],
        }),
    ],
    build: {
        outDir: path.join(distDir, 'es'),
        rollupOptions: {
            output: {
                entryFileNames: '[name].js',
                preserveModules: true,
                preserveModulesRoot: 'packges',
            }
        },
        lib: {
            entry: './packges',
            formats: ['es']
        }
    },

})
