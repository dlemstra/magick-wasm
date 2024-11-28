/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ComplexOperator } from '@src/enums/complex-operator';
import { ComplexSettings } from '@src/settings/complex-settings';
import { TestFiles } from '@test/test-files';

describe('MagickImageCollection#complex', () => {
    it('should throw exception when collection is empty', () => {
        const settings = new ComplexSettings(ComplexOperator.Add);

        TestFiles.Images.emptyCollection.use((images) => {
            expect(() => {
                images.complex(settings, () => { /* never reached */ });
            }).toThrowError('operation requires at least one image');
        });
    });

    it('should apply the complex operation', () => {
        const settings = new ComplexSettings(ComplexOperator.Divide);
        settings.signalToNoiseRatio = 5;

        TestFiles.Images.roseSparkleGif.use(images => {
            images.complex(settings, (image) => {
                expect(image).toEqualImage(images[0], 0.56843);
            });
        });
    });
});
