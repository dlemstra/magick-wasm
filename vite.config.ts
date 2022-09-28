import { builtinModules } from 'module';
import { defineConfig } from 'vitest/config';

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
    },
    test: {
        globals: true,
        setupFiles: './tests/custom-environment.ts',
        threads: false,
        logHeapUsage: true,
    },
});
