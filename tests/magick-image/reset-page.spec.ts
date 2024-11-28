/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickGeometry } from '@src/types/magick-geometry';
import { TestFiles } from '@test/test-files';

describe('MagickImage#resetPage', () => {
    it('should reset the page', () => {
        TestFiles.Images.empty.use((image) => {
            image.page = new MagickGeometry(1, 2, 3, 4);

            image.resetPage();

            const page = image.page;
            expect(page.x).toBe(0);
            expect(page.y).toBe(0);
            expect(page.width).toBe(0);
            expect(page.height).toBe(0);
        });
    });
});
