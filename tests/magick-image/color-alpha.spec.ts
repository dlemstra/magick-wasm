// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { MagickColors } from '../../src/magick-colors';
import { TestFiles } from '../test-files';
import '../custom-matcher';

beforeEach(() => {
    ImageMagick._api = global.native;
});

describe('MagickImage#colorAlpha', () => {
    it('should color the alpha channel', async () => {
        await TestFiles.redPng.read(image => {
            image.colorAlpha(MagickColors.Magenta);
            expect(image).toHavePixelWithColor(350, 80, MagickColors.Magenta);
        });
    });
});
