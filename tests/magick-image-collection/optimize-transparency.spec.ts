/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickColors } from '@src/magick-colors';
import { MagickImage } from '@src/magick-image';
import { TestFiles } from '@test/test-files';

describe('MagickImageCollection#optimizePlus', () => {
    it('should throw exception when collection is empty', () => {
        TestFiles.Images.emptyCollection.use((images) => {
            expect(() => {
                images.optimizeTransparency();
            }).toThrowError('operation requires at least one image');
        });
    });

    it('should make part of the images transparent', () => {
        TestFiles.Images.emptyCollection.use((images) => {

            images.push(MagickImage.create(MagickColors.Red, 1, 2));
            images.push(MagickImage.create(MagickColors.Red, 1, 2));

            const second = MagickImage.create(MagickColors.Red, 1, 1);
            second.extent(1, 2, MagickColors.Green);
            images.push(second);

            images.optimizeTransparency();

            expect(images.length).toBe(3);
            expect(images[0].width).toBe(1);
            expect(images[0].height).toBe(2);
            expect(images[0]).toHavePixelWithColor(0, 0, '#ff0000');
            expect(images[0]).toHavePixelWithColor(0, 1, '#ff0000');

            expect(images[1].width).toBe(1);
            expect(images[1].height).toBe(2);
            expect(images[1]).toHavePixelWithColor(0, 0, '#ff000000');
            expect(images[1]).toHavePixelWithColor(0, 1, '#ff000000');

            expect(images[2].width).toBe(1);
            expect(images[2].height).toBe(2);
            expect(images[2]).toHavePixelWithColor(0, 0, '#ff000000');
            expect(images[2]).toHavePixelWithColor(0, 1, '#008000');
        });
    });
});
