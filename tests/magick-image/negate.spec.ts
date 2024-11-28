/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { MagickColors } from '@src/magick-colors';
import { TestFiles } from '@test/test-files';

describe('MagickImage#negate', () => {
    it('should negate the image', () => {
        TestFiles.Images.empty.use((image) => {
            image.read(MagickColors.Red, 1, 1);

            image.negate();

            expect(image).toHavePixelWithColor(0, 0, MagickColors.Cyan);
        });
    });

    it('should only negate specified channels', () => {
        TestFiles.Images.empty.use((image) => {
            image.read(MagickColors.Magenta, 1, 1);

            image.negate(Channels.Red);

            expect(image).toHavePixelWithColor(0, 0, MagickColors.Blue);
        });
    });
});
