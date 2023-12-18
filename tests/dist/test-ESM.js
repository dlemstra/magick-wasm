// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import fs from 'node:fs';
import { createRequire } from 'node:module';
import { initializeImageMagick, Magick } from '@imagemagick/magick-wasm';
const require = createRequire(import.meta.url);

const wasmLocation = require.resolve('@imagemagick/magick-wasm/magick.wasm');
const wasmBytes = fs.readFileSync(wasmLocation);

initializeImageMagick(wasmBytes).then(() => {
  console.log(Magick.features);
});
