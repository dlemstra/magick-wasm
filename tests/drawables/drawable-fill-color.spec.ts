// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { DrawableColor } from '../../src/drawables/drawable-color';
import { DrawableFillColor } from '../../src/drawables/drawable-fill-color';
import { ImageMagick } from '../../src/image-magick';
import { MagickColors } from '../../src/magick-colors';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import { PaintMethod } from '../../src/paint-method';
import '../custom-matcher';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
    image.read(MagickColors.Black, 1, 1);
});

afterEach(() => {
    image.dispose();
});

describe('DrawableFillColor', () => {
    it('should set the fill color for following drawing actions', () => {
        const fillColor = MagickColors.Red;

        image.draw([
            new DrawableFillColor(fillColor),
            new DrawableColor(0, 0, PaintMethod.Floodfill),
        ]);

        expect(image).toHavePixelWithColor(0, 0, fillColor);
    });
});
