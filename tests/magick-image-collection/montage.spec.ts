// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ErrorMetric } from '@src/enums/error-metric';
import { MagickImageCollection } from '@src/magick-image-collection';
import { MagickGeometry } from '@src/types/magick-geometry';
import { MontageSettings } from '@src/settings/montage-settings';
import { TestImages } from '@test/test-images';
import { TestFonts } from '@test/test-fonts';

describe('MagickImageCollection#montage', () => {
    it('should throw exception when collection is empty', () => {
        expect(() => {
            const settings = new MontageSettings();
            const images = MagickImageCollection.create();
            images.montage(settings, () => { /* never reached */ });
        }).toThrowError('operation requires at least one image');
    });

    it('should create a mosaic of the images', () => {
        TestImages.roseSparkleGif.use(images => {
            images[1].page = new MagickGeometry(100, 100, images[1].width, images[1].height);

            const settings = new MontageSettings();
            settings.font = TestFonts.kaushanScriptRegularTtf.name;
            settings.borderWidth = 20;

            images.montage(settings, image => {
                expect(image.width).toBe(504);
                expect(image.height).toBe(166);

                const difference = images[0].compare(image, ErrorMetric.RootMeanSquared);
                expect(difference).toBeCloseTo(0.56318);
            });
        });
    });
});
