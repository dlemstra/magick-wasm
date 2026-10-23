/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ErrorMetric } from '@src/enums/error-metric';
import { PixelInterpolateMethod } from '@src/enums/pixel-interpolate-method';
import { TestFiles } from '@test/test-files';

describe('MagickImage#implode', () => {
    it('should preserve the image with a zero amount', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.resize(64, 48);
            image.clone(original => {
                image.implode(0, PixelInterpolateMethod.Nearest);

                expect(image).toEqualImage(original);
            });
        });
    });

    it('should distort the image differently for positive and negative amounts', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.resize(64, 48);
            image.clone(original => {
                image.clone(other => {
                    image.implode(0.5, PixelInterpolateMethod.Blend);
                    other.implode(-0.5, PixelInterpolateMethod.Blend);

                    expect(image.width).toBe(64);
                    expect(image.height).toBe(48);
                    expect(other.width).toBe(64);
                    expect(other.height).toBe(48);

                    expect(image).toEqualImage(original, 0.14103);
                    expect(image).toEqualImage(other, 0.19295);
                    expect(original).toEqualImage(other, 0.13734);
                });
            });
        });
    });

    it('should use the specified interpolation method', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.resize(64, 48);
            image.clone(other => {
                image.implode(0.5, PixelInterpolateMethod.Blend);
                other.implode(0.5, PixelInterpolateMethod.Nearest);


                expect(image).toEqualImage(other, 0.04667);
            });
        });
    });
});
