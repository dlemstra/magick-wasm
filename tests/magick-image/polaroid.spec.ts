/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickColors } from '@src/magick-colors';
import { PixelInterpolateMethod } from '@src/enums/pixel-interpolate-method';
import { TestFiles } from '@test/test-files';

describe('MagickImage#polaroid', () => {
    it('should simulate a polaroid picture', () => {
        TestFiles.Images.empty150x150Canvas.use(image => {
            const width = image.width;
            const height = image.height;
            image.settings.borderColor = MagickColors.Red;
            image.backgroundColor = MagickColors.Fuchsia;
            image.settings.font = TestFiles.Fonts.kaushanScriptRegularTtf.name;
            image.settings.fontPointsize = 20;
            image.polaroid('Caption', 0, PixelInterpolateMethod.Bilinear);

            const captionRegionY = Math.floor(height * 1.1);
            const captionRegionHeight = image.height - captionRegionY;
            const darkPixels = image.getPixels(pixels => {
                const values = pixels.toByteArray(0, captionRegionY, image.width, captionRegionHeight, 'RGB')!;
                let count = 0;
                for (let i = 0; i < values.length; i += 3) {
                    if (values[i] < 30 && values[i + 1] < 30 && values[i + 2] < 30)
                        count++;
                }
                return count;
            });

            expect(image.width).toBeGreaterThan(width);
            expect(image.height).toBeGreaterThan(height);
            expect(darkPixels).toBe(156);
        });
    });
});
