// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { CompositeOperator } from '../../src/composite-operator';
import { ImageMagick } from '../../src/image-magick';
import { TestFiles } from '../test-files';

beforeAll(() => { ImageMagick._api = global.native; });

describe('MagickImage#compose', () => {
    it('should return the compose operator', () => {
        TestFiles.Builtin.logo.read(image => {
            expect(image.compose).toBe(CompositeOperator.Over);
        });
    });

    it('should change the compose operator', () => {
        TestFiles.Builtin.logo.read(image => {
            image.compose = CompositeOperator.ChangeMask;
            expect(image.compose).toBe(CompositeOperator.ChangeMask);
        });
    });
});
