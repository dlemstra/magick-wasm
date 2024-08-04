/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { readFileSync, writeFileSync } from 'node:fs';
import { initializeImageMagick, ImageMagick } from '@imagemagick/magick-wasm';

const inputFile = '';
const outputFile = '';
const bytes = readFileSync(inputFile);

const wasmLocation = '../node_modules/@dlemstra/magick-native/magick.wasm';
const wasmBytes = readFileSync(wasmLocation);
initializeImageMagick(wasmBytes).then(() => {
    ImageMagick.read(bytes, (image) => {
        image.write(data => {
            writeFileSync(outputFile, data);
        });
    });
}).catch(err => {
    console.error(err);
});
