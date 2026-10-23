/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Magick } from '@src/magick';
import { TestFiles } from '@test/test-files';

describe('MagickImage#sketch', () => {
    it('should use the default radius, sigma and angle', () => {
        try {
            TestFiles.Images.Builtin.logo.use(image => {
                image.resize(64, 48);
                image.clone(other => {
                    Magick.setRandomSeed(42);
                    image.sketch();
                    Magick.setRandomSeed(42);
                    other.sketch(0, 1, 0);

                    expect(image).toEqualImage(other);
                });
            });
        } finally {
            Magick.resetRandomSeed();
        }
    });

    it('should simulate a pencil sketch without changing the dimensions', () => {
        try {
            Magick.setRandomSeed(42);
            TestFiles.Images.Builtin.logo.use(image => {
                image.resize(64, 48);
                image.clone(original => {
                    image.sketch();

                    expect(image.width).toBe(64);
                    expect(image.height).toBe(48);
                    expect(image).toEqualImage(original, 0.18076);
                });
            });
        } finally {
            Magick.resetRandomSeed();
        }
    });

    it.each([
        [3, 1, 0, 0.06515],
        [0, 2, 0, 0.05365],
        [0, 1, 90, 0.05973],
    ])('should use radius %s, sigma %s and angle %s', (radius, sigma, angle, exceptedDistortion) => {
        try {
            TestFiles.Images.Builtin.logo.use(image => {
                image.resize(64, 48);
                image.clone(other => {
                    Magick.setRandomSeed(42);
                    image.sketch();
                    Magick.setRandomSeed(42);
                    other.sketch(radius, sigma, angle);

                    expect(image).toEqualImage(other, exceptedDistortion);
                });
            });
        } finally {
            Magick.resetRandomSeed();
        }
    });
});
