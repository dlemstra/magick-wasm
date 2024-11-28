/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickFormat } from '@src/enums/magick-format';
import { TestFiles } from '@test/test-files';

describe('MagickImageCollection#write', () => {
    it('should throw exception when collection is empty', () => {
        TestFiles.Images.emptyCollection.use((images) => {
            expect(() => {
                images.write(() => { /* never reached */ });
            }).toThrowError('operation requires at least one image');
        });
    });

    it('should write images to array', () => {
        TestFiles.Images.emptyCollection.use((images) => {
            images.read(TestFiles.Images.roseSparkleGif.data);

            images.write(newData => {
                images.dispose();
                images.read(newData);

                expect(images.length).toBe(3);
            });
        });
    });

    it('should write images to array in the specified format', () => {
        TestFiles.Images.emptyCollection.use((images) => {
            images.read(TestFiles.Images.roseSparkleGif.data);

            images.write(MagickFormat.Tiff, newData => {
                images.dispose();
                images.read(newData);

                expect(images.length).toBe(3);
                expect(images[0].format).toBe(MagickFormat.Tiff);
            });
        });
    });
});
