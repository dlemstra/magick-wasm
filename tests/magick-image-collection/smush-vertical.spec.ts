/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickColors } from '@src/magick-colors';
import { TestFiles } from '@test/test-files';

describe('MagickImageCollection#smushVertical', () => {
    it('should throw exception when collection is empty', () => {
        TestFiles.Images.emptyCollection.use((images) => {
            expect(() => {
                images.smushVertical(3, () => { /* never reached */ });
            }).toThrowError('operation requires at least one image');
        });
    });

    it('should smush the images vertically', () => {
        TestFiles.Images.roseSparkleGif.use((images) => {
            images[0].backgroundColor = MagickColors.Purple;
            images.smushVertical(10, (image) => {
                expect(image.width).toBe(70);
                expect(image.height).toBe(158);

                expect(image).toHavePixelWithColor(34, 50, '#800080');
                expect(image).toHavePixelWithColor(55, 140, '#800080');
            });
        });
    });
});
