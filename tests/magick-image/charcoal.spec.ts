/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestImages } from '@test/test-images';

describe('MagickImage#charcoal', () => {
    it('should default to a radius of 0 and sigma of 1', () => {
        TestImages.Builtin.logo.use(image => {
            image.clone(other => {
                image.charcoal();
                other.charcoal(0.0, 1.0);

                expect(other).toEqualImage(image);
            });
        });
    });

    it('should create an charcoal the image', () => {
        TestImages.Builtin.logo.use(image => {
            image.clone(other => {
                other.charcoal(4, 2);

                expect(other).toEqualImage(image, 0.31179);
            });
        });
    });
});
