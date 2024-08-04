/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestImages } from '@test/test-images';

describe('MagickImage#animationTicksPerSecond', () => {
    it('should return the animation ticks per second', () => {
        TestImages.empty.use(image => {
            expect(image.animationTicksPerSecond).toBe(100);
        });
    });

    it('should change the animation ticks per second', () => {
        TestImages.empty.use(image => {
            image.animationTicksPerSecond = 10;
            expect(image.animationTicksPerSecond).toBe(10);
        });
    });
});
