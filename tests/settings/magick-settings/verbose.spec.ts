/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickFormat } from '@src/enums/magick-format';
import { TestFiles } from '@test/test-files';

describe('MagickSettings#verbose', () => {
    it('should write the expected output when verbose is disabled', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.settings.verbose = false;
            image.write(MagickFormat.Info, data => {
                expect(data.length).toBe(70);
            });
        });
    });

    it('should write the expected output when verbose is enabled', () => {
        TestFiles.Images.Builtin.logo.use(image => {
            image.settings.verbose = true;
            image.write(MagickFormat.Info, data => {
                expect(data.length).toBeGreaterThan(29000);
            });
        });
    });
});
