/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickColors } from '@src/magick-colors';
import { MagickImage } from '@src/magick-image';
import { TestImages } from '@test/test-images';
import { saveImage } from '@test/save-image';

describe('MagickImageCollection#remap', () => {
    it('should throw exception when collection is empty', () => {
        TestImages.emptyCollection.use((images) => {
            TestImages.empty.use((image) => {
                expect(() => {
                    images.remap(image);
                }).toThrowError('operation requires at least one image');
            });
        });
    });

    it('should replaces the colors of the images.', () => {
        TestImages.emptyCollection.use((frames) => {
            frames.push(MagickImage.create(MagickColors.Red, 1, 1));
            frames.push(MagickImage.create(MagickColors.Green, 1, 1));

            frames.appendHorizontally(image => {
                TestImages.roseSparkleGif.use((images) => {
                    images.remap(image);

                    expect(images.length).toBe(3);

                    const histogram0 = images[0].histogram();
                    expect(histogram0.size).toBe(2);
                    expect(histogram0.get(MagickColors.Red.toString())).toBe(1662n);
                    expect(histogram0.get(MagickColors.Green.toString())).toBe(1558n);

                    const histogram1 = images[1].histogram();
                    expect(histogram1.size).toBe(2);
                    expect(histogram1.get(MagickColors.Red.toString())).toBe(1118n);
                    expect(histogram1.get(MagickColors.Green.toString())).toBe(2102n);

                    const histogram2 = images[2].histogram();
                    expect(histogram2.size).toBe(2);
                    expect(histogram2.get(MagickColors.Red.toString())).toBe(1170n);
                    expect(histogram2.get(MagickColors.Green.toString())).toBe(2050n);
                });
            });
        });
    });
});
