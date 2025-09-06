/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DrawableColor } from '@src/drawing/drawable-color';
import { MagickColors } from '@src/magick-colors';
import { PaintMethod } from '@src/enums/paint-method';
import { TestFiles } from '@test/test-files';
import { DrawableRectangle } from '@src/drawing/drawable-rectangle';

describe('DrawableColor', () => {
    it('should color the image with the default fill color', () => {
        TestFiles.Images.Color.white.use((image) => {
            image.draw([new DrawableColor(0, 0, PaintMethod.Floodfill)]);

            const fillColor = MagickColors.Black;
            expect(image).toHavePixelWithColor(0, 0, fillColor);
            expect(image).toHavePixelWithColor(1, 0, fillColor);
            expect(image).toHavePixelWithColor(0, 1, fillColor);
            expect(image).toHavePixelWithColor(1, 1, fillColor);
        });
    });

    it('should use the border color when the paint method is FillToBorder', () => {
        TestFiles.Images.empty150x150Canvas.use((image) => {
            image.settings.fillColor = MagickColors.Purple;
            image.draw([new DrawableRectangle(10, 10, 140, 140)]);

            image.settings.fillColor = MagickColors.Yellow;
            image.draw([new DrawableRectangle(30, 30, 120, 120)]);

            const fillColor = MagickColors.Green;
            image.settings.fillColor = fillColor;
            image.settings.borderColor = MagickColors.Purple;
            image.draw([new DrawableColor(50, 50, PaintMethod.FillToBorder)]);

            expect(image).toHavePixelWithColor(30, 30, fillColor);
            expect(image).toHavePixelWithColor(30, 120, fillColor);
            expect(image).toHavePixelWithColor(120, 120, fillColor);
            expect(image).toHavePixelWithColor(120, 30, fillColor);
        });
    });
});
