import { defineConfig } from 'vitest/config';
import path from 'path';

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
        threads: false,
        logHeapUsage: true,
    },
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, './src'),
            '@test': path.resolve(__dirname, './tests')
        },
    },
});
