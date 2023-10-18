// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '@src/image-magick';
import { MagickReadSettings } from '@src/settings/magick-read-settings';
import { TestFonts } from '@test/test-fonts';

describe('MagickSettings#textInterlineSpacing', () => {
    it.each([
        [30, 74, 69],
        [130, 74, 169],
    ])('should draw text with the expected interline spacing %s', (textInterlineSpacing: number, width: number, height: number) => {
        const settings = new MagickReadSettings();
        settings.font = TestFonts.kaushanScriptRegularTtf.name;
        settings.textInterlineSpacing = textInterlineSpacing;

        ImageMagick.read('label:magick-wasm\nimage-magick', settings, (image) => {
            expect(image.width).toBe(width);
            expect(image.height).toBe(height);
        });
    });
});
