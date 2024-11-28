/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickFormat } from '@src/enums/magick-format';
import { TestFiles } from '@test/test-files';

describe('MagickImageCollection#read', () => {
    it('should read built-in image', () => {
        TestFiles.Images.emptyCollection.use((images) => {
            images.read('logo:');

            expect(images.length).toBe(1);
            expect(images[0].width).toBe(640);
            expect(images[0].height).toBe(480);
        });
    });

    it('should read images from array', () => {
        TestFiles.Images.emptyCollection.use((images) => {
            images.read(TestFiles.Images.roseSparkleGif.data);

            expect(images.length).toBe(3);
            images.forEach(image => {
                expect(image.format).toBe(MagickFormat.Gif);
                expect(image.width).toBe(70);
                expect(image.height).toBe(46);
                image.getPixels((p) => {
                    expect(p.getPixel(0, 0).length).toBe(5);
                });
            });
        });
    });
});
