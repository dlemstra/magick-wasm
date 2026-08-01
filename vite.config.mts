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
        testTimeout: 60000,
        isolate: true,
    },
    resolve: {
        alias: {
            '@src': resolve(import.meta.dirname, './src'),
            '@test': resolve(import.meta.dirname, './tests'),
        },
    },
});
