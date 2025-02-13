/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickColors } from '@src/magick-colors';
import { TestFiles } from '@test/test-files';

describe('MagickImage#setWriteMask', () => {
    it('should set mask for whole image', () => {
        TestFiles.Images.Builtin.logo.use((image) => {
            TestFiles.Images.empty.use((writeMask) => {
                writeMask.read(MagickColors.White, 10, 15);
                image.setWriteMask(writeMask);

                image.getWriteMask(mask => {
                    mask = expectToNotBeNull(mask);
                    expect(mask.width).toBe(640);
                    expect(mask.height).toBe(480);
                    expect(mask).toHavePixelWithColor(9, 14, '#fff');
                    expect(mask).toHavePixelWithColor(10, 15, '#000');
                });
            });
        });
    });
});
