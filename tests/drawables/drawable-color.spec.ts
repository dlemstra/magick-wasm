// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { DrawableColor } from '../../src/drawables/drawable-color';
import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import { MagickColors } from '../../src/magick-colors';
import { PaintMethod } from '../../src/paint-method';
import '../custom-matcher';

let image: IMagickImage;

beforeAll(() => { ImageMagick._api = global.native; });

beforeEach(() => {
    image = MagickImage.create();
    image.read(MagickColors.White, 2, 2);
});

afterEach(() => {
    image.dispose();
});

describe('DrawableColor', () => {
    it('should color the image with the default fill color', () => {
        image.draw([new DrawableColor(0, 0, PaintMethod.Floodfill)]);

        const fillColor = MagickColors.Black;
        expect(image).toHavePixelWithColor(0, 0, fillColor);
        expect(image).toHavePixelWithColor(1, 0, fillColor);
        expect(image).toHavePixelWithColor(0, 1, fillColor);
        expect(image).toHavePixelWithColor(1, 1, fillColor);
    });
});
