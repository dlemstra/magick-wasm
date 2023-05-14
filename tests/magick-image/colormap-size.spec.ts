// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { TestImages } from '../test-images';

describe('MagickImage#colormapSize', () => {
    it('should return the colormap size of the image', async () => {
        await TestImages.Builtin.logo.read(image => {
            expect(image.colormapSize).toBe(256);
        });
    });

    it('should change the colormap size', async () => {
        await TestImages.Builtin.logo.read(image => {
            image.colormapSize = 100;
            expect(image.colormapSize).toBe(100);
        });
    });
});
