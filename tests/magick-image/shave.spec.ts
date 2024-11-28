/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickColors } from '@src/magick-colors';
import { TestFiles } from '@test/test-files';

describe('MagickImage#shave', () => {
    it('should shave the image', () => {
        TestFiles.Images.empty.use((image) => {
            image.read(MagickColors.White, 5, 5);
            image.shave(2, 1);

            expect(image.width).toBe(1);
            expect(image.height).toBe(3);
        });
    });
});
