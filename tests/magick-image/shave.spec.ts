// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { IMagickImage, MagickImage } from '@src/magick-image';
import { MagickColors } from '@src/magick-colors';

let image: IMagickImage;

beforeEach(() => {
    image = MagickImage.create();
    image.read(MagickColors.White, 5, 5);
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#shave', () => {
    it('should shave the image', () => {
        image.shave(2, 1);

        expect(image.width).toBe(1);
        expect(image.height).toBe(3);
    });
});
