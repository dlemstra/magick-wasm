import { builtinModules } from 'module';
import { defineConfig } from 'vitest/config';
import esmShim from '@rollup/plugin-esm-shim';
import path from 'path';

export default defineConfig({
    build: {
        target: 'esnext',
        lib: {
            entry: 'src/index.ts',
            name: 'magick-wasm',
            fileName: 'index',
        },
        commonjsOptions: {
            ignore: [...builtinModules, 'ws'],
        },
        rollupOptions: {
            plugins: [esmShim()],
        },
    },
    test: {
        globals: true,
        setupFiles: './tests/custom-environment.ts',
        threads: false,
        logHeapUsage: true,
    },
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, './src'),
            '@test': path.resolve(__dirname, './tests'),
        },
    },
});
