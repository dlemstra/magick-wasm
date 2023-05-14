// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { TestImages } from '../test-images';

describe('MagickImage#gamma', () => {
    it('should return the gamma of the image', async () => {
        await TestImages.Builtin.logo.read(image => {
            expect(image.gamma).toBeCloseTo(0.4545);
        });
    });
});
