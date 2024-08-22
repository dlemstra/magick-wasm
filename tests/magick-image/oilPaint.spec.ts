/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestImages } from '@test/test-images';

describe('MagickImage#oilPaint', () => {
    it('should default to a radius of 3', () => {
        TestImages.Builtin.logo.use((image) => {
            image.clone(other => {
                image.oilPaint();
                other.oilPaint(3.0);

                expect(image).toEqualImage(other);
            });
        });
    });

    it('should create an oil paint like image', () => {
        TestImages.Builtin.logo.use((image) => {
            image.clone(other => {
                other.oilPaint(4.2);

                expect(image).toEqualImage(other, 0.14002);
            });
        });
    });
});
