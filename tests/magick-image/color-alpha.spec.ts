// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { MagickColors } from '../../src/magick-colors';
import { TestImages } from '../test-images';

describe('MagickImage#colorAlpha', () => {
    it('should color the alpha channel', async () => {
        await TestImages.redPng.read(image => {
            image.colorAlpha(MagickColors.Magenta);
            expect(image).toHavePixelWithColor(350, 80, MagickColors.Magenta);
        });
    });
});
