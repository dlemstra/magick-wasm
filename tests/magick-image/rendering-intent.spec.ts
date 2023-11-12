// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { RenderingIntent } from '@src/rendering-intent';
import { TestImages } from '@test/test-images';

describe('MagickImage#renderingIntent', () => {
    it('should have the correct default value', () => {
        TestImages.empty.use(image => {
            expect(image.renderingIntent).toBe(RenderingIntent.Perceptual);
        });
    });

    it('should change the rendering intent', () => {
        TestImages.empty.use(image => {
            image.renderingIntent = RenderingIntent.Saturation;
            expect(image.renderingIntent).toBe(RenderingIntent.Saturation);
        });
    });
});
