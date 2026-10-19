/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('MagickImage#lower', () => {
    it('should lower the image by darkening its edges', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.lower(6);

            expect(image).toHavePixelWithColor(400, 200, '#f79868');
        });
    });
});
