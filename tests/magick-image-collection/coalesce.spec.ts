/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickColor } from '@src/magick-color';
import { MagickColors } from '@src/magick-colors';
import { TestFiles } from '@test/test-files';

describe('MagickImageCollection#coalesce', () => {
    it('should throw exception when collection is empty', () => {
        TestFiles.Images.emptyCollection.use((images) => {
            expect(() => {
                images.coalesce();
            }).toThrowError('operation requires at least one image');
        });
    });

    it('should update the colors for each frame', () => {
        TestFiles.Images.roseSparkleGif.use(images => {
            expect(images[1]).toHavePixelWithColor(0, 0, MagickColors.Transparent);

            images.coalesce();

            expect(images[1]).toHavePixelWithColor(0, 0, new MagickColor('#332d2cff'));
        });
    });
});
