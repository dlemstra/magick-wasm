/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestImages } from '@test/test-images';

describe('MagickImageCollection#polynomial', () => {
    it('should throw exception when collection is empty', () => {
        TestImages.emptyCollection.use((images) => {
            expect(() => {
                images.polynomial([1], () => { /* never reached */ });
            }).toThrowError('operation requires at least one image');
        });
    });

    it('should throw exception when terms are empty', () => {
        TestImages.roseSparkleGif.use((images) => {
            expect(() => {
                images.polynomial([], () => { /* never reached */ });
            }).toThrowError('The specified array cannot be empty');
        });
    });

    it('should change the pixels of the image', () => {
        TestImages.roseSparkleGif.use((images) => {
            images.polynomial([0.5, 0.4, 0.3, 0.2, 0.1], (image) => {
                expect(image.width).toBe(70);
                expect(image.height).toBe(46);
                expect(image.signature).toBe('7ae3c6569e296ea5a204117ac70231f6469af2f59fb89d75b6d35f187ac86569');
            });
        });
    });
});
