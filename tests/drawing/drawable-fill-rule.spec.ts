/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { PathLineToAbs } from '@src/drawing/paths/path-line-to-abs';
import { PathMoveToAbs } from '@src/drawing/paths/path-move-to-abs';
import { DrawableFillRule } from '@src/drawing/drawable-fill-rule';
import { MagickColors } from '@src/magick-colors';
import { TestFiles } from '@test/test-files';
import { DrawablePath } from '@src/drawing/drawable-path';
import { FillRule } from '@src/enums/fill-rule';
import { DrawableFillColor } from '@src/drawing/drawable-fill-color';
import { DrawableStrokeColor } from '@src/drawing/drawable-stroke-color';
import { saveImage } from '@test/save-image';

describe('DrawableFillRule', () => {
    it('should use the even odd fill rule when drawing', () => {
        TestFiles.Images.empty150x150Canvas.use((image) => {
            const paths = [
                new PathMoveToAbs(40, 10),
                new PathLineToAbs(20, 40),
                new PathLineToAbs(140, 100),
                new PathLineToAbs(40, 10),

                new PathMoveToAbs(40, 80),
                new PathLineToAbs(100, 20),
                new PathLineToAbs(140, 80),
                new PathLineToAbs(40, 80),
            ];

            image.draw([
                new DrawableStrokeColor(MagickColors.Green),
                new DrawableFillColor(MagickColors.Red),
                new DrawableFillRule(FillRule.EvenOdd),
                new DrawablePath(paths)
            ]);

            expect(image).toHavePixelWithColor(90, 60, MagickColors.White);
        });
    });

    it('should use the even odd fill rule from the settings when drawing', () => {
        TestFiles.Images.empty150x150Canvas.use((image) => {
            const paths = [
                new PathMoveToAbs(40, 10),
                new PathLineToAbs(20, 40),
                new PathLineToAbs(140, 100),
                new PathLineToAbs(40, 10),

                new PathMoveToAbs(40, 80),
                new PathLineToAbs(100, 20),
                new PathLineToAbs(140, 80),
                new PathLineToAbs(40, 80),
            ];

            image.settings.fillRule = FillRule.EvenOdd;
            image.draw([
                new DrawableStrokeColor(MagickColors.Green),
                new DrawableFillColor(MagickColors.Red),
                new DrawablePath(paths)
            ]);

            expect(image).toHavePixelWithColor(90, 60, MagickColors.White);
        });
    });

    it('should use the non zero fill rule when drawing', () => {
        TestFiles.Images.empty150x150Canvas.use((image) => {
            const paths = [
                new PathMoveToAbs(40, 10),
                new PathLineToAbs(20, 40),
                new PathLineToAbs(140, 100),
                new PathLineToAbs(40, 10),

                new PathMoveToAbs(40, 80),
                new PathLineToAbs(100, 20),
                new PathLineToAbs(140, 80),
                new PathLineToAbs(40, 80),
            ];

            image.draw([
                new DrawableStrokeColor(MagickColors.Green),
                new DrawableFillColor(MagickColors.Red),
                new DrawableFillRule(FillRule.NonZero),
                new DrawablePath(paths)
            ]);

            saveImage(image, 'i:/test.png');

            expect(image).toHavePixelWithColor(90, 60, MagickColors.White);
        });
    });

    it('should use the non zero fill rule from the settings when drawing', () => {
        TestFiles.Images.empty150x150Canvas.use((image) => {
            const paths = [
                new PathMoveToAbs(40, 10),
                new PathLineToAbs(20, 40),
                new PathLineToAbs(140, 100),
                new PathLineToAbs(40, 10),

                new PathMoveToAbs(40, 80),
                new PathLineToAbs(100, 20),
                new PathLineToAbs(140, 80),
                new PathLineToAbs(40, 80),
            ];

            image.settings.fillRule = FillRule.NonZero;
            image.draw([
                new DrawableStrokeColor(MagickColors.Green),
                new DrawableFillColor(MagickColors.Red),
                new DrawablePath(paths)
            ]);

            expect(image).toHavePixelWithColor(90, 60, MagickColors.White);
        });
    });
});
