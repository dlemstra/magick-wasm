/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { CompositeOperator } from '@src/enums/composite-operator';
import { TestFiles } from '@test/test-files';

describe('MagickImage#compose', () => {
    it('should return the compose operator', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            expect(image.compose).toBe(CompositeOperator.Over);
        });
    });

    it('should change the compose operator', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.compose = CompositeOperator.ChangeMask;
            expect(image.compose).toBe(CompositeOperator.ChangeMask);
        });
    });
});
