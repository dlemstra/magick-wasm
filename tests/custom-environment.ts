// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagickApi } from '@dlemstra/magick-native/magick';
import * as ImageMagick from '../src/image-magick';

declare global {
    // eslint-disable-next-line no-var, vars-on-top
    var native: ImageMagickApi;
}

if (!global.native) {
    await ImageMagick.initializeImageMagick();
    global.native = ImageMagick.ImageMagick._api;
}
