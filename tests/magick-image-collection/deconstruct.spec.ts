/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickColors } from '@src/magick-colors';
import { MagickGeometry } from '@src/types/magick-geometry';
import { MagickImage } from '@src/magick-image';
import { TestImages } from '@test/test-images';

describe('MagickImageCollection#deconstruct', () => {
    it('should throw exception when collection is empty', () => {
        TestImages.emptyCollection.use((images) => {
            expect(() => {
                images.deconstruct();
            }).toThrowError('operation requires at least one image');
        });
    });

    it('should break the images down into constituent parts.', () => {
        TestImages.emptyCollection.use((images) => {
            images.push(MagickImage.create(MagickColors.Green, 10, 10));

            TestImages.emptyCollection.use((frames) => {
                frames.push(MagickImage.create(MagickColors.Yellow, 10, 5));
                frames.push(MagickImage.create(MagickColors.Green, 10, 5));

                frames.appendHorizontally(image => {
                    images.push(image);

                    images.deconstruct();

                    expect(images[1].width).toBe(10);
                    expect(images[1].height).toBe(5);
                    expect(images[1].page).toStrictEqual(new MagickGeometry(0, 0, 10, 5));
                });
            });
        });
    });
});
