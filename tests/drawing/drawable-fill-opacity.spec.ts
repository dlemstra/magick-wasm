/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DrawableColor } from '@src/drawing/drawable-color';
import { DrawableFillColor } from '@src/drawing/drawable-fill-color';
import { DrawableFillOpacity } from '@src/drawing/drawable-fill-opacity';
import { MagickColor } from '@src/magick-color';
import { PaintMethod } from '@src/enums/paint-method';
import { Percentage } from '@src/types/percentage';
import { TestFiles } from '@test/test-files';

describe('DrawableFillOpacity', () => {
    it('should set the fill color opacity for following drawing actions', () => {
        TestFiles.Images.Color.black.use((image) => {
            image.draw([
                new DrawableFillColor(new MagickColor(255, 0, 0)),
                new DrawableFillOpacity(new Percentage(10)),
                new DrawableColor(0, 0, PaintMethod.Floodfill)
            ]);

            const fillColor = new MagickColor(255, 0, 0, 25);
            expect(image).toHavePixelWithColor(0, 0, fillColor);
        });
    });

    it('should set the fill color opacity for a fully transparent fill color', () => {
        TestFiles.Images.Color.black.use((image) => {
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
