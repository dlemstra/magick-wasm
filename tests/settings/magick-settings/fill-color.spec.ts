/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ImageMagick } from '@src/image-magick';
import { MagickColor } from '@src/magick-color';
import { MagickReadSettings } from '@src/settings/magick-read-settings';
import { TestFiles } from '@test/test-files';

describe('MagickSettings#fillColor', () => {
    it('should use the correct fill color', () => {
        const settings = new MagickReadSettings();
        settings.font = TestFiles.Fonts.kaushanScriptRegularTtf.name;
        settings.fontPointsize = 100;
        settings.fillColor = new MagickColor('pink');

        ImageMagick.read('label:X', settings, (image) => {
            expect(image.width).toBe(76);
            expect(image.height).toBe(147);
            expect(image).toHavePixelWithColor(44, 74, '#ffc0cb');
        });
    });
});
