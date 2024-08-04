/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickColors } from '@src/magick-colors';
import { TestImages } from '@test/test-images';

describe('MagickImage#setWriteMask', () => {
    it('should set mask for whole image', () => {
        TestImages.Builtin.logo.use((image) => {
            TestImages.empty.use((writeMask) => {
                writeMask.read(MagickColors.White, 10, 15);
                image.setWriteMask(writeMask);

                image.getWriteMask(mask => {
                    mask = expectToNotBeNull(mask);
                    expect(mask.width).toBe(640);
                    expect(mask.height).toBe(480);
                    expect(mask).toHavePixelWithColor(9, 14, '#ffff');
                    expect(mask).toHavePixelWithColor(10, 15, '#00ff');
                });
            });
        });
    });
});
