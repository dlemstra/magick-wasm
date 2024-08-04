/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ErrorMetric } from '@src/enums/error-metric';
import { TestImages } from '@test/test-images';

describe('MagickImage#blur', () => {
    it('should change pixels of the image', () => {
        TestImages.fujiFilmFinePixS1ProJpg.use(image => {
            image.adaptiveBlur(4, 2);
            expect(image).toHavePixelWithColor(56, 68, '#3e719cff');
        });
    });

    it('should use the correct default value for sigma', () => {
        TestImages.Builtin.logo.use(image => {
            image.clone(other => {
                image.adaptiveBlur(3);
                other.adaptiveBlur(3, 1);

                const difference = other.compare(image, ErrorMetric.RootMeanSquared);
                expect(difference).toBe(0);
            })
        });
    });

    it('should use the correct default value for radius and sigma', () => {
        TestImages.Builtin.logo.use(image => {
            image.clone(other => {
                image.adaptiveBlur();
                other.adaptiveBlur(0, 1);

                const difference = other.compare(image, ErrorMetric.RootMeanSquared);
                expect(difference).toBe(0);
            })
        });
    });
});
