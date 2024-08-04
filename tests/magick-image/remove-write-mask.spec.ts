/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickColors } from '@src/magick-colors';
import { TestImages } from '@test/test-images';

describe('MagickImage#removeWriteMask', () => {
    it('should remove the write mask from the image', () => {
        TestImages.empty.use((image) => {
            image.read('logo:');
            TestImages.empty.use((writeMask) => {
                writeMask.read(MagickColors.Black, image.width, image.height);

                image.setWriteMask(writeMask);
            });

            image.getWriteMask(mask => {
                expect(mask).not.toBeNull();
            });

            image.removeWriteMask()

            image.getWriteMask(mask => {
                expect(mask).toBeNull();
            });
        });
    });
});
