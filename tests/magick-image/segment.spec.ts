/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ColorSpace } from '@src/enums/color-space';
import { TestFiles } from '@test/test-files';

describe('MagickImage#segment', () => {
    it('should use the default settings', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.clone(other => {
                image.segment();
                other.segment(ColorSpace.Undefined, 1.0, 1.5);

                expect(image).toEqualImage(other);
            });
        });
    });

    it('should segment the image in the specified color space', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.clone(original => {
                image.segment(ColorSpace.HSB, 1.5, 1.5);

                expect(image).toEqualImage(original, 0.04165);
            });
        });
    });
});
