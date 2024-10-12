/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickFormat } from '@src/enums/magick-format';
import { TestImages } from '@test/test-images';

describe('MagickImageCollection#ping', () => {
    it('should read image metadata of built-in image', () => {
        TestImages.emptyCollection.use((images) => {
            images.ping('logo:');

            expect(images.length).toBe(1);
            expect(images[0].width).toBe(640);
            expect(images[0].height).toBe(480);

            expect(() => {
                images[0].getPixels(() => { /* never reached */ });
            }).toThrowError('image contains no pixel data');
        });
    });

    it('should read image metadata from array', () => {
        TestImages.emptyCollection.use((images) => {
            images.ping(TestImages.roseSparkleGif.data);

            expect(images.length).toBe(3);
            images.forEach(image => {
                expect(image.format).toBe(MagickFormat.Gif);
                expect(image.width).toBe(70);
                expect(image.height).toBe(46);

                expect(() => {
                    images[0].getPixels(() => { /* never reached */ });
                }).toThrowError('image contains no pixel data');
            });
        });
    });
});