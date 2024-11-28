/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { RenderingIntent } from '@src/enums/rendering-intent';
import { TestFiles } from '@test/test-files';

describe('MagickImage#renderingIntent', () => {
    it('should have the correct default value', () => {
        TestFiles.Images.empty.use(image => {
            expect(image.renderingIntent).toBe(RenderingIntent.Perceptual);
        });
    });

    it('should change the rendering intent', () => {
        TestFiles.Images.empty.use(image => {
            image.renderingIntent = RenderingIntent.Saturation;
            expect(image.renderingIntent).toBe(RenderingIntent.Saturation);
        });
    });
});
