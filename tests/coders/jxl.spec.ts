// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { MagickFormat } from '@src/enums/magick-format';
import { TestImages } from '@test/test-images';

describe('Coders#jxl', () => {
    it('should be able to write jxl image', () => {
        TestImages.Builtin.logo.use((image) => {
            image.write(MagickFormat.Jxl, data => {
                expect(data.length).toBe(31570);
            });
        });
    });
});
