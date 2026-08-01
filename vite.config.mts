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
        rolldownOptions: {
            transform: {
                // import.meta.url is unused; WASM is loaded via WasmLocator
                define: { 'import.meta': '{}' },
            },
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
