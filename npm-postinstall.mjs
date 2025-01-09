import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const folder = dirname(filename);

function copyFile(src, dest) {
    const target = resolve(folder, dest);
    const targetFolder = dirname(target);
    if (!existsSync(targetFolder))
        mkdirSync(targetFolder, { recursive: true });

    copyFileSync(resolve(folder, src), target);
    console.log(`Copied ${src} to ${dest}`);
};

copyFile('node_modules/@dlemstra/magick-native/NOTICE', 'NOTICE');
copyFile('node_modules/@dlemstra/magick-native/magick.wasm', 'dist/magick.wasm');
