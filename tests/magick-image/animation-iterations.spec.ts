/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('MagickImage#animationIterations', () => {
    it('should return the animation iterations', () => {
        TestFiles.Images.empty.use(image => {
            expect(image.animationIterations).toBe(0);
        });
    });

    it('should change the animation iterations', () => {
        TestFiles.Images.empty.use(image => {
            image.animationIterations = 10;
            expect(image.animationIterations).toBe(10);
        });
    });
});
