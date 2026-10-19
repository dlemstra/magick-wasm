/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('MagickImage#encipher', () => {
    it('should encipher the image with the specified passphrase', () => {
        TestFiles.Images.Builtin.rose.use(image => {
            image.clone(original => {
                image.encipher('secret');

                expect(image).toEqualImage(original, 0.39736);
            });
        });
    });
});
