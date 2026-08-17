import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function copyFile(src, dest) {
    const target = resolve(__dirname, dest);
    const targetFolder = dirname(target);
    if (!existsSync(targetFolder))
        mkdirSync(targetFolder, { recursive: true });

    copyFileSync(resolve(__dirname, src), target);
    console.log(`Copied ${src} to ${dest}`);
};

copyFile('node_modules/@dlemstra/magick-native/x64/NOTICE', 'NOTICE');
copyFile('node_modules/@dlemstra/magick-native/x64/magick.wasm', 'dist/x64/magick.wasm');
copyFile('node_modules/@dlemstra/magick-native/x86/magick.wasm', 'dist/x86/magick.wasm');
