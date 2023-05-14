// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { MagickFormat } from '../../src/magick-format';
import { TestImages } from '../test-images';

describe('Coders#heic', () => {
    it('should be able to write avif image', async () => {
        await TestImages.Builtin.logo.read((image) => {
            image.write(MagickFormat.Avif, data => {
                expect(data.length).toBe(11410);
            });
        });
    });
});
