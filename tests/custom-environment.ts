/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { readFileSync } from 'node:fs';
import { CustomMatchers, ICustomMatchers } from './custom-matcher';
import { ImageMagick, initializeImageMagick } from '@src/image-magick';
import { ImageMagickApi } from '@dlemstra/magick-native';
import { Magick } from '@src/magick';
import { TestFiles } from './test-files';

declare global {
    var native: ImageMagickApi;
    var expectToNotBeNull: <T>(value: T) => NonNullable<T>;

    namespace Chai { /* eslint-disable-line @typescript-eslint/no-namespace */
        /* eslint-disable @typescript-eslint/no-empty-object-type */
        interface Assertion extends ICustomMatchers { }
        interface AsymmetricMatchersContaining extends ICustomMatchers { }
        /* eslint-enable @typescript-eslint/no-empty-object-type */
    }
}

if (!global.native) {
    let exceptionRaised = false;
    try {
        await initializeImageMagick(new URL('file:///test'));
    } catch {
        exceptionRaised = true;
    }

    if (exceptionRaised === false)
        throw new Error('The initializeImageMagick method should have thrown an exception.');

    const bytes = readFileSync('node_modules/@dlemstra/magick-native/magick.wasm');
    if (Math.random() >= 0.5) {
        const module = await WebAssembly.compile(new Uint8Array(bytes));
        await initializeImageMagick(module);
    } else {
        await initializeImageMagick(bytes);
    }

    const font = TestFiles.Fonts.kaushanScriptRegularTtf;
    Magick.addFont(font.name, font.data);

    global.native = ImageMagick._api;
}

beforeAll(() => { ImageMagick._api = global.native; });

expect.extend(CustomMatchers);

global.expectToNotBeNull = function <T>(value: T): NonNullable<T> {
    expect(value).not.toBeNull();
    return value as NonNullable<T>;
}
