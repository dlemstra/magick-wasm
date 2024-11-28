/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { PixelInterpolateMethod } from '@src/enums/pixel-interpolate-method';
import { TestFiles } from '@test/test-files';

describe('MagickImage#wave', () => {
    it('should use the correct default values', () => {
        TestFiles.Images.Builtin.logo.use((image) => {
            image.clone(other => {
                image.interpolate = PixelInterpolateMethod.Blend;
                image.wave();

                other.wave(PixelInterpolateMethod.Blend, 25.0, 150.0);

                expect(image).toEqualImage(other);
            });
        });
    });

    it('should wave the image', () => {
        TestFiles.Images.Builtin.logo.use((image) => {
            image.clone(other => {
                other.wave(PixelInterpolateMethod.Mesh, 140, 40);

                expect(image).toEqualImage(other, 0.62728);
            });
        });
    });
});
