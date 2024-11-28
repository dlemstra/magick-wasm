/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('MagickImageCollection#smushHorizontal', () => {
    it('should throw exception when collection is empty', () => {
        TestFiles.Images.emptyCollection.use((images) => {
            expect(() => {
                images.smushHorizontal(3, () => { /* never reached */ });
            }).toThrowError('operation requires at least one image');
        });
    });

    it('should smush the images horizontally', () => {
        TestFiles.Images.roseSparkleGif.use((images) => {
            images.smushHorizontal(10, (image) => {
                expect(image.width).toBe(230);
                expect(image.height).toBe(46);
                expect(image).toHavePixelWithColor(75, 20, '#2c2b2bff');
            });
        });
    });
});
