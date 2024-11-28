/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('MagickImage#animationDelay', () => {
    it('should return the animation delay', () => {
        TestFiles.Images.empty.use(image => {
            expect(image.animationDelay).toBe(0);
        });
    });

    it('should change the animation delay', () => {
        TestFiles.Images.empty.use(image => {
            image.animationDelay = 10;
            expect(image.animationDelay).toBe(10);
        });
    });
});
