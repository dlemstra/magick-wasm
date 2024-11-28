/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ErrorMetric } from '@src/enums/error-metric';
import { ImageMagick } from '@src/image-magick';
import { MagickReadSettings } from '@src/settings/magick-read-settings';
import { TestFiles } from '@test/test-files';

describe('MagickSettings#antiAlias', () => {
    it('should use the correct anti alias setting', () => {
        const settings = new MagickReadSettings();
        settings.font = TestFiles.fonts.kaushanScriptRegularTtf.name;

        settings.antiAlias = true;
        ImageMagick.read('label:Test', settings, (imageA) => {
            settings.antiAlias = false;
            ImageMagick.read('label:Test', settings, (imageB) => {
                const distortion = imageA.compare(imageB, ErrorMetric.RootMeanSquared);
                expect(distortion).not.toBe(0);
            });
        });
    });
});
