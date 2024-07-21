// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { TestImages } from '@test/test-images';

describe('MagickImage#motionBlur', () => {
    it('should change pixels of the image', () => {
        TestImages.Builtin.logo.use((image) => {
            image.motionBlur(10, 10, -90);

            expect(image).toHavePixelWithColor(222, 60, '#ff0404ff');
        });
    });
});
