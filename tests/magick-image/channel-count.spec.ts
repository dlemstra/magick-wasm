// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { TestFiles } from '../test-files';

beforeEach(() => {
    ImageMagick._api = global.native;
});

describe('MagickImage#channelCount', () => {
    it('should return the number of channels', async () => {
        await TestFiles.Builtin.logo.read(image => {
            expect(image.channelCount).toBe(4);
        })
    });
});
