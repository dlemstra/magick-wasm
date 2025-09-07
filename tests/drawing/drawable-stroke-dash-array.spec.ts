/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DrawableFillColor } from '@src/drawing/drawable-fill-color';
import { DrawableLine } from '@src/drawing/drawable-line';
import { DrawableStrokeColor } from '@src/drawing/drawable-stroke-color';
import { DrawableStrokeDashArray } from '@src/drawing/drawable-stroke-dash-array';
import { DrawableStrokeWidth } from '@src/drawing/drawable-stroke-width';
import { MagickColors } from '@src/magick-colors';
import { TestFiles } from '@test/test-files';

describe('DrawableStrokeDashArray', () => {
    it('should add dashes to a line', () => {
        TestFiles.Images.empty150x150Canvas.use((image) => {
            image.draw([
                new DrawableStrokeDashArray([10, 20, 30]),
                new DrawableStrokeWidth(20),
                new DrawableFillColor(MagickColors.Green),
                new DrawableStrokeColor(MagickColors.Purple),
                new DrawableLine(10, 10, 130, 140)
            ]);

            expect(image).toHavePixelWithColor(10, 10, MagickColors.Purple);
            expect(image).toHavePixelWithColor(17, 17, MagickColors.Purple);
            expect(image).toHavePixelWithColor(22, 23, MagickColors.Green);
            expect(image).toHavePixelWithColor(31, 32, MagickColors.Purple);
            expect(image).toHavePixelWithColor(50, 54, MagickColors.Purple);
            expect(image).toHavePixelWithColor(57, 61, '#297c29');
            expect(image).toHavePixelWithColor(57, 62, MagickColors.Purple);
            expect(image).toHavePixelWithColor(71, 76, MagickColors.Purple);
        });
    });

    it('should use the setting to add dashes to a line', () => {
        TestFiles.Images.empty150x150Canvas.use((image) => {
            // Because the values are repeated they will be used till the end of the line.
            image.settings.strokeDashArray = [10, 20, 30, 10, 20, 30];
            image.draw([
                new DrawableStrokeWidth(20),
                new DrawableFillColor(MagickColors.Green),
                new DrawableStrokeColor(MagickColors.Purple),
                new DrawableLine(10, 10, 130, 140)
            ]);

            expect(image).toHavePixelWithColor(10, 10, MagickColors.Purple);
            expect(image).toHavePixelWithColor(17, 17, MagickColors.Purple);
            expect(image).toHavePixelWithColor(22, 23, MagickColors.Green);
            expect(image).toHavePixelWithColor(31, 32, MagickColors.Purple);
            expect(image).toHavePixelWithColor(50, 54, MagickColors.Purple);
            expect(image).toHavePixelWithColor(57, 61, '#297c29');
            expect(image).toHavePixelWithColor(57, 62, MagickColors.Purple);
            expect(image).toHavePixelWithColor(71, 76, MagickColors.Purple);
        });
    });
});
