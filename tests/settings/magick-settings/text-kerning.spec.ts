// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../../src/image-magick';
import { MagickReadSettings } from '../../../src/settings/magick-read-settings';
import { TestFonts } from '../../test-fonts';

describe('MagickSettings#textKerning', () => {
    it.each([
        [30, 373, 20],
        [130, 1373, 20],
    ])('should draw text with the expected kerning %s', (textKerning: number, width: number, height: number) => {
        const settings = new MagickReadSettings();
        settings.font = TestFonts.kaushanScriptRegularTtf.name;
        settings.textKerning = textKerning;

        ImageMagick.read('label:magick-wasm', settings, (image) => {
            expect(image.width).toBe(width);
            expect(image.height).toBe(height);
        });
    });
});
