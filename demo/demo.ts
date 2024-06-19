// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { readFileSync } from 'node:fs';
import {
    initializeImageMagick,
    ImageMagick,
    Magick,
    MagickFormat,
    Quantum,
} from '@imagemagick/magick-wasm';

// Remove '../' and use '@imagemagick/magick-wasm' when using this in your project.
const wasmLocation = '../node_modules/@dlemstra/magick-native/magick.wasm';
const wasmBytes = readFileSync(wasmLocation);
initializeImageMagick(wasmBytes).then(() => {
    console.log(Magick.imageMagickVersion);
    console.log('Delegates:', Magick.delegates);
    console.log('Features:', Magick.features);
    console.log('Quantum:', Quantum.depth);

    console.log('');
    ImageMagick.read('logo:', image => {
        image.resize(100, 100);
        image.blur(1, 5);
        console.log(image.toString());

        image.write(MagickFormat.Jpeg, data => {
            console.log(data.length);
        });
    });
});
