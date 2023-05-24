// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { DrawableColor } from '../../src/drawables/drawable-color';
import { DrawableFillColor } from '../../src/drawables/drawable-fill-color';
import { DrawableFillOpacity } from '../../src/drawables/drawable-fill-opacity';
import { MagickColor } from '../../src/magick-color';
import { PaintMethod } from '../../src/paint-method';
import { Percentage } from '../../src/percentage';
import { TestImages } from '../test-images';

describe('DrawableFillOpacity', () => {
    it('should set the fill color opacity for following drawing actions', () => {
        TestImages.Color.black.use((image) => {
            image.draw([
                new DrawableFillColor(new MagickColor(255, 0, 0)),
                new DrawableFillOpacity(new Percentage(10)),
                new DrawableColor(0, 0, PaintMethod.Floodfill)
            ]);

            const fillColor = new MagickColor(255, 0, 0, 26);
            expect(image).toHavePixelWithColor(0, 0, fillColor);
        });
    });

    it('should set the fill color opacity for a fully transparent fill color', () => {
        TestImages.Color.black.use((image) => {
            image.draw([
                new DrawableFillColor(new MagickColor(255, 0, 0, 0)),
                new DrawableFillOpacity(new Percentage(10)),
                new DrawableColor(0, 0, PaintMethod.Floodfill)
            ]);

            const fillColor = new MagickColor(255, 0, 0, 26);
            expect(image).toHavePixelWithColor(0, 0, fillColor);
        });
    });
});
