/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { PixelCollection } from '@src/pixels/pixel-collection';
import { TestImages } from '@test/test-images';

describe('MagickImage#getPixels', () => {
    it('should dispose pixel instance', () => {
        TestImages.Builtin.logo.use((image) => {
            let pixels = PixelCollection._create(image);
            image.getPixels((p) => {
                pixels = p as PixelCollection;
            });

            expect(() => { pixels._instance }).toThrowError('instance is disposed');
        });
    });
});
