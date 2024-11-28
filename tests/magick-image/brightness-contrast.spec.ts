/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Percentage } from '@src/types/percentage';
import { TestFiles } from '@test/test-files';

describe('MagickImage#brightnessContrast', () => {
    it('should not change at all', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.clone(other => {
                other.brightnessContrast(new Percentage(0), new Percentage(0));

                expect(other).toEqualImage(image);
            });
        });
    });

    it('should change the brightness only', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.clone(other => {
                other.brightnessContrast(new Percentage(50), new Percentage(0));

                expect(other).toEqualImage(image, 0.18096);
            });
        });
    });

    it('should change both brightness and contrast', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.clone(other => {
                other.brightnessContrast(new Percentage(50), new Percentage(100));

                expect(other).toEqualImage(image, 0.27885);
            });
        });
    });
});
