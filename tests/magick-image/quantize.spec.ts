/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DitherMethod } from '@src/enums/dither-method';
import { QuantizeSettings } from '@src/settings/quantize-settings';
import { TestFiles } from '@test/test-files';

describe('MagickImage#quantize', () => {
    it('should reduce the colors of the image', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            const settings = new QuantizeSettings;
            settings.colors = 10;

            image.quantize(settings);

            expect(image).toHavePixelWithColor(400, 200, '#ecbd4a');
        });
    });

    it('should use the dither method', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            const settings = new QuantizeSettings;
            settings.colors = 10;
            settings.ditherMethod = DitherMethod.FloydSteinberg;

            const result = image.quantize(settings);

            expect(result).toBeNull();
            expect(image).toHavePixelWithColor(400, 200, '#aaa4a5');
        });
    });

    it('should return the error info when measureErrors is true', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            const settings = new QuantizeSettings;
            settings.colors = 3;
            settings.measureErrors = true;

            const result = image.quantize(settings);

            expect(result).not.toBeNull();
            expect(result!.meanErrorPerPixel).toBeCloseTo(7.79208, 4);
            expect(result!.normalizedMaximumError).toBeCloseTo(0.67450, 4);
            expect(result!.normalizedMeanError).toBeCloseTo(0.00852, 4);
        });
    });
});
