/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('MagickImage#constructor', () => {
    it('should create empty uninitialized instance', () => {
        TestFiles.Images.empty.use(image => {
            expect(() => {
                image.resize(1, 1);
            }).toThrowError('NegativeOrZeroImageSize `\' @ error/image.c/CloneImage');
        });
    });
});
