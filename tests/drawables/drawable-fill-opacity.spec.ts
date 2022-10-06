// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { DrawableColor } from '../../src/drawables/drawable-color';
import { DrawableFillColor } from '../../src/drawables/drawable-fill-color';
import { DrawableFillOpacity } from '../../src/drawables/drawable-fill-opacity';
import { ImageMagick } from '../../src/image-magick';
import { MagickColor } from '../../src/magick-color';
import { MagickColors } from '../../src/magick-colors';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import { PaintMethod } from '../../src/paint-method';
import { Percentage } from '../../src/percentage';
import '../custom-matcher';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = global.native;
    image = MagickImage.create();
    image.read(MagickColors.Black, 1, 1);
});

afterEach(() => {
    image.dispose();
});

describe('DrawableFillOpacity', () => {
    it('should set the fill color opacity for following drawing actions', () => {
        image.draw([
            new DrawableFillColor(new MagickColor(255, 0, 0)),
            new DrawableFillOpacity(new Percentage(10)),
            new DrawableColor(0, 0, PaintMethod.Floodfill),
        ]);

        const fillColor = new MagickColor(255, 0, 0, 26);
        expect(image).toHavePixelWithColor(0, 0, fillColor);
    });

    it('should set the fill color opacity for a fully transparent fill color', () => {
        image.draw([
            new DrawableFillColor(new MagickColor(255, 0, 0, 0)),
            new DrawableFillOpacity(new Percentage(10)),
            new DrawableColor(0, 0, PaintMethod.Floodfill),
        ]);

        const fillColor = new MagickColor(255, 0, 0, 26);
        expect(image).toHavePixelWithColor(0, 0, fillColor);
    });
});
