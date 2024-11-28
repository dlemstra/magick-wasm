/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickGeometry } from '@src/types/magick-geometry';
import { MontageSettings } from '@src/settings/montage-settings';
import { TestFiles } from '@test/test-files';
import { TestFiles } from '@test/test-files';

describe('MagickImageCollection#montage', () => {
    it('should throw exception when collection is empty', () => {
        const settings = new MontageSettings();
        TestFiles.Images.emptyCollection.use((images) => {
            expect(() => {
                images.montage(settings, () => { /* never reached */ });
            }).toThrowError('operation requires at least one image');
        });
    });

    it('should create a mosaic of the images', () => {
        TestFiles.Images.roseSparkleGif.use(images => {
            images[1].page = new MagickGeometry(100, 100, images[1].width, images[1].height);

            const settings = new MontageSettings();
            settings.font = TestFiles.Fonts.kaushanScriptRegularTtf.name;
            settings.borderWidth = 20;

            images.montage(settings, image => {
                expect(image.width).toBe(504);
                expect(image.height).toBe(166);

                expect(image).toEqualImage(images[0], 0.56319);
            });
        });
    });
});
