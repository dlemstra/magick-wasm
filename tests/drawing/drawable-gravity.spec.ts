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
        [Gravity.Northwest, 22, 4],
        [Gravity.North, 31, 4],
        [Gravity.Northeast, 40, 4],
        [Gravity.West, 22, 21],
        [Gravity.Center, 31, 21],
        [Gravity.East, 40, 21],
        [Gravity.Southwest, 22, 39],
        [Gravity.South, 31, 39],
        [Gravity.Southeast, 40, 39],
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

            expect(image).toHavePixelWithColor(31, 21, '#108810');
        });
    });
});
