/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('MagickImageCollection#appendVertically', () => {
    it('should throw exception when collection is empty', () => {
        TestFiles.Images.emptyCollection.use((images) => {
            expect(() => {
                images.appendVertically(() => { /* never reached */ });
            }).toThrowError('operation requires at least one image');
        });
    });

    it('should create a new image with the images appended vertically', () => {
        TestFiles.Images.roseSparkleGif.use(images => {
            images.appendVertically(image => {
                expect(image.width).toBe(70);
                expect(image.height).toBe(138);
            });
        });
    });
});
