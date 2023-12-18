import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    build: {
        target: 'esnext',
        lib: {
            entry: 'src/index.ts',
            name: 'magick-wasm',
            fileName: 'index',
        },
    },
    test: {
        globals: true,
        setupFiles: './tests/custom-environment.ts',
        logHeapUsage: true,
    },
    resolve: {
        alias: {
            '@src': resolve(__dirname, './src'),
            '@test': resolve(__dirname, './tests'),
        },
    },
});
