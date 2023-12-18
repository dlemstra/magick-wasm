// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

const { readFileSync } = require('node:fs');
const { initializeImageMagick, Magick } = require('@imagemagick/magick-wasm');

const wasmLocation = require.resolve('@imagemagick/magick-wasm/magick.wasm');
const wasmBytes = readFileSync(wasmLocation);

initializeImageMagick(wasmBytes).then(() => {
  console.log(Magick.features);
});
