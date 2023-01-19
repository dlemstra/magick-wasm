// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { DrawableRectangle } from '../../src/drawables/drawable-rectangle';
import { DrawableFillColor } from '../../src/drawables/drawable-fill-color';
import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import { MagickColors } from '../../src/magick-colors';
import '../custom-matcher';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = global.native;
    image = MagickImage.create();
    image.read(MagickColors.White, 5, 4);
});

afterEach(() => {
    image.dispose();
});

describe('DrawableRectangle', () => {
    it('should draw a rectangle', () => {
        image.draw([
            new DrawableFillColor(MagickColors.Green),
            new DrawableRectangle(1, 1, 3, 2),
        ]);

        // Check a corner
        expect(image).toHavePixelWithColor(0, 0, '#ffffffff');
        expect(image).toHavePixelWithColor(0, 3, '#ffffffff');
        expect(image).toHavePixelWithColor(3, 0, '#ffffffff');

        // Check the inside
        expect(image).toHavePixelWithColor(1, 1, '#008000ff');
        expect(image).toHavePixelWithColor(3, 2, '#008000ff');
    });
});
