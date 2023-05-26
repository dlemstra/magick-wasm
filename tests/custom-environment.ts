// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { CustomMatchers, ICustomMatchers } from './custom-matcher';
import { ImageMagick, initializeImageMagick } from '../src/image-magick';
import { ImageMagickApi } from '@dlemstra/magick-native/magick';
import { Magick } from '../src/magick';
import { TestFonts } from './test-fonts';
import * as fs from 'fs';

declare global {
    var native: ImageMagickApi; /* eslint-disable-line no-var */
    var expectToNotBeNull: <T>(value: T) => NonNullable<T>; /* eslint-disable-line no-var */

    namespace Chai { /* eslint-disable-line @typescript-eslint/no-namespace */
         /* eslint-disable @typescript-eslint/no-empty-interface */
        interface Assertion extends ICustomMatchers {}
        interface AsymmetricMatchersContaining extends ICustomMatchers {}
        /* eslint-enable @typescript-eslint/no-empty-interface */
    }
}

if (!global.native) {
    if (Math.random() >= 0.5) {
        const bytes = fs.readFileSync('node_modules/@dlemstra/magick-native/magick.wasm');
        await initializeImageMagick(bytes);
    } else {
        await initializeImageMagick();
    }

    const font = TestFonts.kaushanScriptRegularTtf;
    Magick.addFont(font.name, font.data);

    global.native = ImageMagick._api;
}

beforeAll(() => { ImageMagick._api = global.native; });

expect.extend({
    toHavePixelWithColor: CustomMatchers.toHavePixelWithColor
});

global.expectToNotBeNull = function <T>(value: T): NonNullable<T> {
    expect(value).not.toBeNull();
    return value as NonNullable<T>;
}
