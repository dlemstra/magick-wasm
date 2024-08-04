/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DitherMethod } from '@src/enums/dither-method';
import { QuantizeSettings } from '@src/settings/quantize-settings';
import { TestImages } from '@test/test-images';

describe('MagickImage#quantize', () => {
    it('should reduce the colors of the image', () => {
        TestImages.Builtin.logo.use(image => {
            const settings = new QuantizeSettings;
            settings.colors = 10;

            image.quantize(settings);

            expect(image).toHavePixelWithColor(400, 200, '#ecbd4aff');
        });
    });

    it('should use the dither method', () => {
        TestImages.Builtin.logo.use(image => {
            const settings = new QuantizeSettings;
            settings.colors = 10;
            settings.ditherMethod = DitherMethod.FloydSteinberg;

            image.quantize(settings);

            expect(image).toHavePixelWithColor(400, 200, '#aaa4a5ff');
        });
    });
});
