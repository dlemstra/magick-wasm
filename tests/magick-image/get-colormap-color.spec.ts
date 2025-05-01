/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('MagickImage#getColormapColor', () => {
    it('should return the color at the specified index', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            expect(image.getColormapColor(0)).toEqualColor('#040707');
            expect(image.getColormapColor(42)).toEqualColor('#5e5e19');
        })
    });

    it('should return null when the image has no colormap', () => {
        TestFiles.Images.fujiFilmFinePixS1ProJpg.use(image => {
            expect(image.getColormapColor(0)).toBeNull();
        })
    });
});
