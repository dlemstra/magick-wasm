import { builtinModules } from 'module';
import { defineConfig } from 'vite';

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
});
