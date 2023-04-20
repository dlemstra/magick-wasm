// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { TestFiles } from '../test-files';

beforeAll(() => { ImageMagick._api = global.native; });

describe('MagickImage#colormapSize', () => {
    it('should return the colormap size of the image', async () => {
        await TestFiles.Builtin.logo.read(image => {
            expect(image.colormapSize).toBe(256);
        });
    });

    it('should change the colormap size', async () => {
        await TestFiles.Builtin.logo.read(image => {
            image.colormapSize = 100;
            expect(image.colormapSize).toBe(100);
        });
    });
});
