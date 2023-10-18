// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { OrientationType } from '@src/orientation-type';
import { TestImages } from '@test/test-images';

describe('MagickImage#autoOrient', () => {
    it('should rotate the image', () => {
        TestImages.Builtin.logo.use(image => {
            image.orientation = OrientationType.LeftTop;
            image.autoOrient();

            expect(image.orientation).toBe(OrientationType.TopLeft);
            expect(image.width).toBe(480);
            expect(image.height).toBe(640);
        });
    });
});
