// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { TestFiles } from '../test-files';

beforeEach(() => {
    ImageMagick._api = global.native;
});

describe('MagickImage#hasAlpha', () => {
    it('should return true when image has alpha channel', async () => {
        await TestFiles.redPng.read(image => {
            expect(image.hasAlpha).toBe(true);
        });
    });

    it('should should disable the alpha channel', async () => {
        await TestFiles.redPng.read(image => {
            image.hasAlpha = false;

            expect(image.hasAlpha).toBe(false);
        });
    });
});
