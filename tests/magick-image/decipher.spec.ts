/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('MagickImage#decipher', () => {
    it('should restore an enciphered image with the correct passphrase', () => {
        TestFiles.Images.Builtin.rose.use(image => {
            image.clone(original => {
                image.encipher('secret');
                image.decipher('secret');

                expect(image).toEqualImage(original);
            });
        });
    });
});
