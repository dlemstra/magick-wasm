// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../../src/image-magick';
import { MagickColor } from '../../../src/magick-color';
import { MagickReadSettings } from '../../../src/settings/magick-read-settings';
import { TestFonts } from '../../test-fonts';

describe('MagickSettings#backgroundColor', () => {
    it('should use the correct background color', () => {
        const settings = new MagickReadSettings();
        settings.font = TestFonts.kaushanScriptRegularTtf.name;
        settings.backgroundColor = new MagickColor('pink');

        ImageMagick.read('label:magick-wasm', settings, (image) => {
            expect(image.width).toBe(73);
            expect(image.height).toBe(20);
            expect(image).toHavePixelWithColor(0, 0, '#ffc0cbff');
        });
    });
});
