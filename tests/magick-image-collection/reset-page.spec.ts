/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickGeometry } from '@src/types/magick-geometry';
import { TestFiles } from '@test/test-files';

describe('MagickImage#resetPage', () => {
    it('should reset the page', () => {
        TestFiles.Images.roseSparkleGif.use((images) => {
            images.forEach((image) => {
                image.page = new MagickGeometry(3, 4, 1, 2);
                expect(image.page.toString()).toBe('1x2+3+4');
            });

            images.resetPage();

            images.forEach((image) => {
                expect(image.page.toString()).toBe('0x0+0+0');
            });
        });
    });
});
