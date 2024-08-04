/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestImages } from '@test/test-images';

describe('MagickImage#blackPointCompensation', () => {
    it('should have the correct default value', () => {
        TestImages.empty.use(image => {
            expect(image.blackPointCompensation).toBe(false);
        });
    });

    it('should be preserved when cloning an image', () => {
        TestImages.Builtin.logo.use(image => {
            image.blackPointCompensation = true;
            image.clone(clone => {
                expect(clone.blackPointCompensation).toBe(true);
            });
        });
    });
});
