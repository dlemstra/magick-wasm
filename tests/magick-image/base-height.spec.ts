// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { TestFiles } from '../test-files';

beforeEach(() => {
    ImageMagick._api = global.native;
});

describe('MagickImage#baseHeight', () => {
    it('should return the height of the image before transformations.', async () => {
        await TestFiles.Builtin.logo.read(image => {
            image.resize(1, 1);

            expect(image.baseHeight).toBe(480);
        })
    });
});
