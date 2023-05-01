// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagickApi } from '@dlemstra/magick-native/magick';
import { Magick } from '../src/magick';
import { TestFiles } from './test-files';
import * as ImageMagick from '../src/image-magick';
import * as fs from 'fs';

declare global {
    var native: ImageMagickApi; /* eslint-disable-line no-var */
}

if (!global.native) {
    if (Math.random() >= 0.5) {
        const bytes = fs.readFileSync('node_modules/@dlemstra/magick-native/magick.wasm');
        await ImageMagick.initializeImageMagick(bytes);
    } else {
        await ImageMagick.initializeImageMagick();
    }

    const font = TestFiles.Fonts.kaushanScriptRegularTtf;
    Magick.addFont(font.name, font.file.toBufferSync());

    global.native = ImageMagick.ImageMagick._api;
}
