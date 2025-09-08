/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ImageMagick } from '@src/image-magick';
import { MagickReadSettings } from '@src/settings/magick-read-settings';
import { TestFiles } from '@test/test-files';

describe('MagickSettings#textKerning', () => {
    it.each([
        [30, 373, 20],
        [130, 1373, 20],
    ])('should draw text with the expected kerning %s', (textKerning: number, width: number, height: number) => {
        const settings = new MagickReadSettings();
        settings.font = TestFiles.Fonts.kaushanScriptRegularTtf.name;
        settings.textKerning = textKerning;

        ImageMagick.read('label:magick-wasm', settings, (image) => {
            expect(image.width).toBe(width);
            expect(image.height).toBe(height);
        });
    });

    it('should set the kerning attribute', () => {
        TestFiles.Images.empty.use(image => {
            image.settings.textKerning = 30;

            expect(image.getArtifact('kerning')).toBe('30');
        });
    });
});
