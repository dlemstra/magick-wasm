/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickFormat } from '@src/enums/magick-format';
import { TestFiles } from '@test/test-files';

describe('Coders#jxl', () => {
    it('should be able to write jxl image', () => {
        TestFiles.Images.Builtin.logo.use((image) => {
            image.write(MagickFormat.Jxl, data => {
                expect(data.length).toBe(37904);
            });
        });
    });
});
