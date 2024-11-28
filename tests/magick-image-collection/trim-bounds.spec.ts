/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickColors } from '@src/magick-colors';
import { MagickImage } from '@src/magick-image';
import { TestFiles } from '@test/test-files';

describe('MagickImageCollection#trimBounds', () => {
    it('should throw exception when collection is empty', () => {
        TestFiles.Images.emptyCollection.use((images) => {
            expect(() => {
                images.trimBounds();
            }).toThrowError('operation requires at least one image');
        });
    });

    it('should adjust the canvas', () => {
        TestFiles.Images.emptyCollection.use(images => {

            images.push(MagickImage.create(MagickColors.Red, 6, 7));
            images.push(MagickImage.create(MagickColors.Red, 8, 5));

            images.trimBounds();

            expect(images.length).toBe(2);
            expect(images[0].page.toString()).toBe('8x7+0+0');
            expect(images[1].page.toString()).toBe('8x7+0+0');
        });
    });
});
