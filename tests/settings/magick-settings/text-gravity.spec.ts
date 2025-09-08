/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Gravity } from '@src/enums/gravity';
import { TestFiles } from '@test/test-files';

describe('MagickSettings#textKerning', () => {
    it('should set the kerning attribute', () => {
        TestFiles.Images.empty.use(image => {
            image.settings.textGravity = Gravity.Center;

            expect(image.getArtifact('gravity')).toBe('center');
        });
    });
});
