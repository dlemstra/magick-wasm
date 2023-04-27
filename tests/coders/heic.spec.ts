// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { MagickFormat } from '../../src/magick-format';
import { TestFiles } from '../test-files';

beforeAll(() => { ImageMagick._api = global.native; });

describe('Coders#heic', () => {
    it('should be able to write avif image', async () => {
        await TestFiles.Builtin.logo.read((image) => {
            image.write(MagickFormat.Avif, data => {
                expect(data.length).toBe(11413);
            });
        });
    });
});
