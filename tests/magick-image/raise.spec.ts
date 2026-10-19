/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('MagickImage#raise', () => {
    it('should raise the image by lightening its edges', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.clone(other => {
                image.raise(6);
                other.lower(6);

                expect(image).not.toEqualImage(other);
                expect(image).toHavePixelWithColor(400, 200, '#f79868');
            });
        });
    });
});
