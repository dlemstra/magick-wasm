// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagickApi } from '@dlemstra/magick-native/magick';
import * as ImageMagick from '../src/image-magick';

declare global {
    var native: ImageMagickApi; // eslint-disable-line no-var
}

if (!global.native) {
    await ImageMagick.initializeImageMagick();
    global.native = ImageMagick.ImageMagick._api;
}
