// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Gravity } from '../../src/gravity';
import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import { MagickColor } from '../../src/magick-color';
import { MagickColors } from '../../src/magick-colors';
import { MagickGeometry } from '../../src/magick-geometry';
import '../custom-matcher'

let image: IMagickImage;

beforeAll(() => { ImageMagick._api = global.native; });

beforeEach(() => {
    image = MagickImage.create();
    image.read(MagickColors.Red, 1, 1);
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#trim', () => {
    it('should trim the image', () => {
        image.extent(new MagickGeometry('3x3'), Gravity.Center, MagickColors.White)

        image.trim();

        expect(image.width).toBe(1);
        expect(image.height).toBe(1);
    });

    it.each([
        [[Gravity.North], 3, 2, MagickColors.Lime, 1, 1],
        [[Gravity.East], 2, 3, MagickColors.Red, 1, 1],
        [[Gravity.South], 3, 2, MagickColors.Red, 1, 1],
        [[Gravity.West], 2, 3, MagickColors.Lime, 1, 1],
        [[Gravity.East, Gravity.West], 1, 3, MagickColors.Red, 0, 1],
        [[Gravity.North, Gravity.South], 3, 1, MagickColors.Lime, 0, 1]
    ])('should trim the specified edges', (gravity: Gravity[], width: number, height: number, color: MagickColor, x: number, y: number) => {
        image.extent(new MagickGeometry('3x3'), Gravity.Center, MagickColors.Lime)

        if (gravity.length === 1)
            image.trim(gravity[0]);
        else if (gravity.length === 2)
            image.trim(gravity[0], gravity[1]);

        expect(image.width).toBe(width);
        expect(image.height).toBe(height);
        expect(image).toHavePixelWithColor(x, y, color);
    });
});
