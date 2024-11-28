/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('MagickImage#colormapSize', () => {
    it('should return the colormap size of the image', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            expect(image.colormapSize).toBe(256);
        });
    });

    it('should change the colormap size', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.colormapSize = 100;
            expect(image.colormapSize).toBe(100);
        });
    });
});
