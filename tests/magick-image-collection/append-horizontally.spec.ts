/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('MagickImageCollection#appendHorizontally', () => {
    it('should throw exception when collection is empty', () => {
        TestFiles.Images.emptyCollection.use((images) => {
            expect(() => {
                images.appendHorizontally(() => { /* never reached */ });
            }).toThrowError('operation requires at least one image');
        });
    });

    it('should create a new image with the images appended horizontally', () => {
        TestFiles.Images.roseSparkleGif.use(images => {
            images.appendHorizontally(image => {
                expect(image.width).toBe(210);
                expect(image.height).toBe(46);
            });
        });
    });
});
