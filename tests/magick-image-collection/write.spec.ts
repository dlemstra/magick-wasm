/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickFormat } from '@src/enums/magick-format';
import { TestImages } from '@test/test-images';

describe('MagickImageCollection#write', () => {
    it('should throw exception when collection is empty', () => {
        TestImages.emptyCollection.use((images) => {
            expect(() => {
                images.write(() => { /* never reached */ });
            }).toThrowError('operation requires at least one image');
        });
    });

    it('should write images to array', () => {
        TestImages.emptyCollection.use((images) => {
            images.read(TestImages.roseSparkleGif.data);

            images.write(newData => {
                images.dispose();
                images.read(newData);

                expect(images.length).toBe(3);
            });
        });
    });

    it('should write images to array in the specified format', () => {
        TestImages.emptyCollection.use((images) => {
            images.read(TestImages.roseSparkleGif.data);

            images.write(MagickFormat.Tiff, newData => {
                images.dispose();
                images.read(newData);

                expect(images.length).toBe(3);
                expect(images[0].format).toBe(MagickFormat.Tiff);
            });
        });
    });
});
