/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Channels } from '@src/enums/channels';
import { MagickColors } from '@src/magick-colors';
import { TestFiles } from '@test/test-files';

describe('MagickImage#inverseLevelColors', () => {
    it('should inverse level the colors iof the imagel', () => {
        TestFiles.Images.imageMagickJpg.use(image => {
            image.clone(original => {
                image.inverseLevelColors(MagickColors.Fuchsia, MagickColors.Goldenrod);

                expect(image).toEqualImage(original, 0.54546);
            });
        });
    });

    it('should inverse level the colors of the specified channel', () => {
        TestFiles.Images.imageMagickJpg.use(image => {
            image.clone(original => {
                image.inverseLevelColors(MagickColors.Fuchsia, MagickColors.Goldenrod, Channels.Blue);

                expect(image).toEqualImage(original, 0.46859);
            });
        });
    });
});
