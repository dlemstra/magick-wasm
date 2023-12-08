// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { initializeImageMagick, Magick } from '../../dist/index.mjs';
import fs from 'fs';

const wasmLocation = '../../node_modules/@dlemstra/magick-native/magick.wasm';
const wasmBytes = fs.readFileSync(wasmLocation);

initializeImageMagick(wasmBytes).then(() => {
  console.log(Magick.features);
});
