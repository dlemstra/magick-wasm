/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DrawableFillColor } from '@src/drawing/drawable-fill-color';
import { DrawableLine } from '@src/drawing/drawable-line';
import { DrawableStrokeColor } from '@src/drawing/drawable-stroke-color';
import { DrawableStrokeDashArray } from '@src/drawing/drawable-stroke-dash-array';
import { DrawableStrokeDashOffset } from '@src/drawing/drawable-stroke-dash-offset';
import { DrawableStrokeWidth } from '@src/drawing/drawable-stroke-width';
import { MagickColors } from '@src/magick-colors';
import { TestFiles } from '@test/test-files';

describe('DrawableStrokeDashArray', () => {
    it('should use the offset when adding dashes to a line', () => {
        TestFiles.Images.empty150x150Canvas.use((image) => {
            image.draw([
                new DrawableStrokeDashOffset(1),
                new DrawableStrokeDashArray([10, 20, 30]),
                new DrawableStrokeWidth(20),
                new DrawableFillColor(MagickColors.Green),
                new DrawableStrokeColor(MagickColors.Purple),
                new DrawableLine(10, 10, 130, 140)
            ]);

            expect(image).toHavePixelWithColor(10, 10, MagickColors.Purple);
            expect(image).toHavePixelWithColor(16, 16, MagickColors.Purple);
            expect(image).toHavePixelWithColor(22, 23, MagickColors.Green);
            expect(image).toHavePixelWithColor(30, 31, MagickColors.Purple);
            expect(image).toHavePixelWithColor(49, 53, MagickColors.Purple);
            expect(image).toHavePixelWithColor(56, 60, '#447d44');
            expect(image).toHavePixelWithColor(57, 61, MagickColors.Purple);
            expect(image).toHavePixelWithColor(70, 75, MagickColors.Purple);
        });
    });

    it('should use offset of the setting to add dashes to a line', () => {
        TestFiles.Images.empty150x150Canvas.use((image) => {
            image.settings.strokeDashOffset = 1;
            image.draw([
                new DrawableStrokeDashArray([10, 20, 30]),
                new DrawableStrokeWidth(20),
                new DrawableFillColor(MagickColors.Green),
                new DrawableStrokeColor(MagickColors.Purple),
                new DrawableLine(10, 10, 130, 140)
            ]);

            expect(image).toHavePixelWithColor(10, 10, MagickColors.Purple);
            expect(image).toHavePixelWithColor(16, 16, MagickColors.Purple);
            expect(image).toHavePixelWithColor(22, 23, MagickColors.Green);
            expect(image).toHavePixelWithColor(30, 31, MagickColors.Purple);
            expect(image).toHavePixelWithColor(49, 53, MagickColors.Purple);
            expect(image).toHavePixelWithColor(56, 60, '#447d44');
            expect(image).toHavePixelWithColor(57, 61, MagickColors.Purple);
            expect(image).toHavePixelWithColor(70, 75, MagickColors.Purple);
        });
    });
});
