/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickColors } from '@src/magick-colors';
import { MagickImage } from '@src/magick-image';
import { TestImages } from '@test/test-images';

describe('MagickImageCollection#evaluate', () => {
    it('should throw exception when collection is empty', () => {
        TestImages.emptyCollection.use((images) => {
            expect(() => {
                images.optimize();
            }).toThrowError('operation requires at least one image');
        });
    });

    it('should throw exception when images are not the same size', () => {
        TestImages.emptyCollection.use((images) => {
            images.push(MagickImage.create(MagickColors.Red, 1, 1));
            images.push(MagickImage.create(MagickColors.Red, 1, 2));

            expect(() => {
                images.optimize();
            }).toThrowError('ImagesAreNotTheSameSize');
        });
    });

    it('should optimize the images', () => {
        TestImages.emptyCollection.use((images) => {

            images.push(MagickImage.create(MagickColors.Red, 1, 2));
            images.push(MagickImage.create(MagickColors.Red, 1, 2));

            const second = MagickImage.create(MagickColors.Red, 1, 1);
            second.extent(1, 2, MagickColors.Green);
            images.push(second);

            images.optimize();

            expect(images.length).toBe(3);
            expect(images[0].width).toBe(1);
            expect(images[0].height).toBe(2);

            expect(images[1].width).toBe(1);
            expect(images[1].height).toBe(1);
            expect(images[1].page.x).toBe(-1);
            expect(images[1].page.y).toBe(-1);

            expect(images[2].width).toBe(1);
            expect(images[2].height).toBe(1);
            expect(images[2].page.x).toBe(0);
            expect(images[2].page.y).toBe(1);
        });
    });
});
