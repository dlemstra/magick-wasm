// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagickApi } from '@dlemstra/magick-native/magick';
import { Magick } from '../src/magick';
import { TestFiles } from './test-files';
import * as ImageMagick from '../src/image-magick';

declare global {
    var native: ImageMagickApi; /* eslint-disable-line no-var */
}

if (!global.native) {
    await ImageMagick.initializeImageMagick();

    const font = TestFiles.Fonts.kaushanScriptRegularTtf;
    Magick.addFont(font.name, font.file.toBufferSync());

    global.native = ImageMagick.ImageMagick._api;
}
