/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickFormat } from '@src/enums/magick-format';
import { MagickGeometry } from '@src/types/magick-geometry';
import { TestFiles } from '@test/test-files';

describe('MagickImageCollection#mosaic', () => {
    it('should throw exception when collection is empty', () => {
        TestFiles.Images.emptyCollection.use((images) => {
            expect(() => {
                images.mosaic(() => { /* never reached */ });
            }).toThrowError('operation requires at least one image');
        });
    });

    it('should create a mosaic of the images', () => {
        TestFiles.Images.roseSparkleGif.use(images => {
            images[1].page = new MagickGeometry(100, 100, images[1].width, images[1].height);

            images.mosaic(image => {
                expect(image.format).toBe(MagickFormat.Gif);
                expect(image.width).toBe(170);
                expect(image.height).toBe(146);

                expect(image).toEqualImage(images[0], 0.28644);
            });
        });
    });
});
