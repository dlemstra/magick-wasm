/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Gravity } from '@src/enums/gravity';
import { MagickColors } from '@src/magick-colors';
import { MagickGeometry } from '@src/types/magick-geometry';
import { TestFiles } from '@test/test-files';
import { bogusAsyncMethod } from '@test/bogus-async';

describe('MagickImage#cloneArea', () => {
    it('should create a clone of the specified area of the image', () => {
        TestFiles.Images.empty.use(image => {
            image.read(MagickColors.Magenta, 5, 4);
            image.extent(new MagickGeometry(6, 6), Gravity.Northwest, MagickColors.Green);

            image.cloneArea(new MagickGeometry(4, 3, 1, 2), clone => {
                expect(clone.width).toBe(1);
                expect(clone.height).toBe(2);
                expect(clone).toHavePixelWithColor(0, 0, MagickColors.Magenta);
                expect(clone).toHavePixelWithColor(0, 1, MagickColors.Green);
            });
        });
    });

    it('should create a clone of the specified area of the image async', async () => {
        await TestFiles.Images.empty.use(async image => {
            image.read(MagickColors.Magenta, 5, 4);
            image.extent(new MagickGeometry(6, 6), Gravity.Northwest, MagickColors.Green);

            await image.cloneArea(new MagickGeometry(4, 3, 1, 2), async clone => {
                expect(clone.width).toBe(1);
                expect(clone.height).toBe(2);
                expect(clone).toHavePixelWithColor(0, 0, MagickColors.Magenta);
                expect(clone).toHavePixelWithColor(0, 1, MagickColors.Green);

                await bogusAsyncMethod();
            });
        });
    });
});
