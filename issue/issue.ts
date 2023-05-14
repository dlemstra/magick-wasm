// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import * as fs from 'fs';
import {
    initializeImageMagick,
    ImageMagick,
    MagickFormat,
} from '../';

const inputFile = '';
const bytes = fs.readFileSync(inputFile);

const wasmLocation = '../node_modules/@dlemstra/magick-native/magick.wasm';
initializeImageMagick(wasmLocation).then(() => {
    ImageMagick.read(bytes, (image) => {
    });
}).catch(err => {
    console.error(err);
});
