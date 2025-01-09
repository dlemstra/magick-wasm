import { copyFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const folder = dirname(filename);

function copyFile(src, dest) {
    copyFileSync(resolve(folder, src), resolve(folder, dest));
    console.log(`Copied ${src} to ${dest}`);
};

copyFile('node_modules/@dlemstra/magick-native/NOTICE', 'NOTICE');
copyFile('node_modules/@dlemstra/magick-native/magick.wasm', 'dist/magick.wasm');
