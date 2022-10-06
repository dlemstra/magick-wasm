// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

/* eslint-disable no-console */

import {
    ImageMagick,
    Magick,
    MagickFormat,
    Quantum,
    initializeImageMagick,
} from '@imagemagick/magick-wasm';

initializeImageMagick().then(async () => {
    console.log(Magick.imageMagickVersion);
    console.log('Delegates:', Magick.delegates);
    console.log('Features:', Magick.features);
    console.log('Quantum:', Quantum.depth);

    console.log('');
    ImageMagick.read('logo:', image => {
        image.resize(100, 100);
        image.blur(1, 5);
        console.log(image.toString());

        image.write(data => {
            console.log(data.length);
        }, MagickFormat.Jpeg);
    });
}).catch(err => {
    console.error(err);
});
