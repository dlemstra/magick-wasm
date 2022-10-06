// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import { TestFiles } from '../test-files';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = global.native;
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#quality', () => {
    it('should not allow a value below 1', () => {
        image.quality = 0;
        expect(image.quality).toBe(1);
    });

    it('should not allow a value above 100', () => {
        image.quality = 101;
        expect(image.quality).toBe(100);
    });

    it('should return the image quality', async () => {
        await TestFiles.imageMagickJpg.read(image => {
            expect(image.quality).toBe(100);
        });
    });
});
