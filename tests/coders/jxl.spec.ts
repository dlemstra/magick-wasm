// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { MagickFormat } from '../../src/magick-format';
import { TestFiles } from '../test-files';

beforeAll(() => { ImageMagick._api = global.native; });

describe('Coders#jxl', () => {
    it('should be able to write jxl image', async () => {
        await TestFiles.Builtin.logo.read((image) => {
            image.write(data => {
                expect(data.length).toBe(31570);
            }, MagickFormat.Jxl);
        });
    });
});
