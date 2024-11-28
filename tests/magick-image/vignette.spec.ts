/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('MagickImage#vignette', () => {
    it('should use the correct default values', () => {
        TestFiles.Images.Builtin.logo.use((image) => {
            image.clone(other => {
                image.vignette();
                other.vignette(0.0, 1.0, 0, 0);

                expect(image).toEqualImage(other);
            });
        });
    });

    it('should soften the edges of the image', () => {
        TestFiles.Images.Builtin.logo.use((image) => {
            image.clone(other => {
                other.vignette(1.4, 2.5, 0, 0);

                expect(image).toEqualImage(other, 0.43856);
            });
        });
    });
});
