// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import { MagickColors } from '../../src/magick-colors';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#borderColor', () => {
    it('should return the border color of the image', () => {
        const borderColor = image.borderColor;
        expect(borderColor.r).toBe(223);
        expect(borderColor.g).toBe(223);
        expect(borderColor.b).toBe(223);
        expect(borderColor.a).toBe(255);
    });

    it('should change border color', () => {
        image.borderColor = MagickColors.Black;
        const borderColor = image.borderColor;
        expect(borderColor.r).toBe(0);
        expect(borderColor.g).toBe(0);
        expect(borderColor.b).toBe(0);
        expect(borderColor.a).toBe(255);
    });
});
