/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('MagickImage#blackPointCompensation', () => {
    it('should have the correct default value', () => {
        TestFiles.Images.empty.use(image => {
            expect(image.blackPointCompensation).toBe(false);
        });
    });

    it('should be preserved when cloning an image', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.blackPointCompensation = true;
            image.clone(clone => {
                expect(clone.blackPointCompensation).toBe(true);
            });
        });
    });
});
