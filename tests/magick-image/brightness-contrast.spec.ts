/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Percentage } from '@src/types/percentage';
import { TestImages } from '@test/test-images';

describe('MagickImage#brightnessContrast', () => {
    it('should not change at all', () => {
        TestImages.Builtin.logo.use(image => {
            image.clone(other => {
                other.brightnessContrast(new Percentage(0), new Percentage(0));

                expect(other).toEqualImage(image);
            });
        });
    });

    it('should change the brightness only', () => {
        TestImages.Builtin.logo.use(image => {
            image.clone(other => {
                other.brightnessContrast(new Percentage(50), new Percentage(0));

                expect(other).toEqualImage(image, 0.18096);
            });
        });
    });

    it('should change both brightness and contrast', () => {
        TestImages.Builtin.logo.use(image => {
            image.clone(other => {
                other.brightnessContrast(new Percentage(50), new Percentage(100));

                expect(other).toEqualImage(image, 0.27885);
            });
        });
    });
});
