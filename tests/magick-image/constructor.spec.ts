// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { TestImages } from '@test/test-images';

describe('MagickImage#constructor', () => {
    it('should create empty uninitialized instance', () => {
        TestImages.empty.use(image => {
            expect(() => {
                image.resize(1, 1);
            }).toThrowError('NegativeOrZeroImageSize `\' @ error/image.c/CloneImage');
        });
    });
});
