// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

const { initializeImageMagick, Magick } = require('../../dist/index.umd.js');

const wasmLocation = '../../node_modules/@dlemstra/magick-native/magick.wasm';

initializeImageMagick(wasmLocation).then(() => {
  console.log(Magick.imageMagickVersion);
});
