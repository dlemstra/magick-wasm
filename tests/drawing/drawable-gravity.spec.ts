/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DrawableFillColor } from '@src/drawing/drawable-fill-color';
import { DrawableFont } from '@src/drawing/drawable-font';
import { DrawableFontPointSize } from '@src/drawing/drawable-font-point-size';
import { DrawableGravity } from '@src/drawing/drawable-gravity';
import { DrawableText } from '@src/drawing/drawable-text';
import { Gravity } from '@src/enums/gravity';
import { MagickColors } from '@src/magick-colors';
import { TestFiles } from '@test/test-files';

describe('DrawableGravity', () => {
    it.each([
        [Gravity.Northwest, 29, 1],
        [Gravity.North, 38, 1],
        [Gravity.Northeast, 47, 1],
        [Gravity.West, 29, 20],
        [Gravity.Center, 38, 20],
        [Gravity.East, 47, 20],
        [Gravity.Southwest, 29, 38],
        [Gravity.South, 38, 38],
        [Gravity.Southeast, 47, 38],
    ])('should draw text at the expected gravity %s', (gravity: Gravity, x: number, y: number) => {
        TestFiles.Images.empty.use(image => {
            image.read(MagickColors.White, 50, 50);
            image.draw([
                new DrawableFillColor(MagickColors.Green),
                new DrawableGravity(gravity),
                new DrawableFont(TestFiles.Fonts.kaushanScriptRegularTtf.name),
                new DrawableFontPointSize(10),
                new DrawableText(0, 0, 'Magick'),
            ])

            expect(image).toHavePixelWithColor(x, y, '#108810');
        });
    });

    it('should draw text at the expected gravity using the settings', () => {
        TestFiles.Images.empty.use(image => {
            image.read(MagickColors.White, 50, 50);
            image.settings.textGravity = Gravity.Center;
            image.draw([
                new DrawableFillColor(MagickColors.Green),
                new DrawableFont(TestFiles.Fonts.kaushanScriptRegularTtf.name),
                new DrawableFontPointSize(10),
                new DrawableText(0, 0, 'Magick'),
            ])

            expect(image).toHavePixelWithColor(38, 20, '#108810');
        });
    });
});
