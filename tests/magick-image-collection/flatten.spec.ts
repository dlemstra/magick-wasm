/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickFormat } from '@src/enums/magick-format';
import { TestFiles } from '@test/test-files';

describe('MagickImageCollection#flatten', () => {
    it('should throw exception when collection is empty', () => {
        TestFiles.Images.emptyCollection.use((images) => {
            expect(() => {
                images.flatten(() => { /* never reached */ });
            }).toThrowError('operation requires at least one image');
        });
    });

    it('should flatten the images', () => {
        TestFiles.Images.roseSparkleGif.use(images => {
            images.flatten(image => {
                expect(image.format).toBe(MagickFormat.Gif);
                expect(image.width).toBe(70);
                expect(image.height).toBe(46);

                expect(image).toEqualImage(images[0], 0.11920);
            });
        });
    });
});
