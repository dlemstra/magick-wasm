// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { DrawableRoundRectangle } from '../../src/drawables/drawable-round-rectangle';
import { DrawableFillColor } from '../../src/drawables/drawable-fill-color';
import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import { MagickColors } from '../../src/magick-colors';
import '../custom-matcher';

let image: IMagickImage;

beforeAll(() => { ImageMagick._api = global.native; });

beforeEach(() => {
    image = MagickImage.create();
    image.read(MagickColors.White, 12, 12);
});

afterEach(() => {
    image.dispose();
});

describe('DrawableRoundRectangle', () => {
    it('should draw a rounded rectangle', () => {
        image.draw([
            new DrawableFillColor(MagickColors.Green),
            new DrawableRoundRectangle(0, 0, 11, 11, 5, 5),
        ]);

        // Check a corner
        expect(image).toHavePixelWithColor(0, 0, '#ffffffff');
        expect(image).toHavePixelWithColor(0, 1, '#ffffffff');
        expect(image).toHavePixelWithColor(1, 0, '#ffffffff');

        // Check an edge and inside
        expect(image).toHavePixelWithColor(6, 0, '#008000ff');
        expect(image).toHavePixelWithColor(6, 6, '#008000ff');
    });
});
