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
                images.optimizePlus();
            }).toThrowError('operation requires at least one image');
        });
    });

    it('should throw exception when images are not the same size', () => {
        TestFiles.Images.emptyCollection.use((images) => {
            images.push(MagickImage.create(MagickColors.Red, 1, 1));
            images.push(MagickImage.create(MagickColors.Red, 1, 2));

            expect(() => {
                images.optimizePlus();
            }).toThrowError('ImagesAreNotTheSameSize');
        });
    });

    it('should add additional images', () => {
        TestFiles.Images.movingHoleGif.use((images) => {

            expect(images.length).toBe(4);

            images.optimizePlus();

            expect(images.length).toBe(7);

            expect(images[0].page.toString()).toBe('100x100+0+0');
            expect(images[1].page.toString()).toBe('100x100+61+27');
            expect(images[2].page.toString()).toBe('100x100+27+12');
            expect(images[3].page.toString()).toBe('100x100+46+61');
            expect(images[4].page.toString()).toBe('100x100+46+27');
            expect(images[5].page.toString()).toBe('100x100+12+46');
            expect(images[6].page.toString()).toBe('100x100+12+46');
        });
    });
});
