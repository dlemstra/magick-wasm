/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DrawableFillColor } from '@src/drawing/drawable-fill-color';
import { DrawableFont } from '@src/drawing/drawable-font';
import { DrawableFontPointSize } from '@src/drawing/drawable-font-point-size';
import { DrawableText } from '@src/drawing/drawable-text';
import { DrawableTextInterlineSpacing } from '@src/drawing/drawable-text-interline-spacing';
import { MagickColor } from '@src/magick-color';
import { TestFiles } from '@test/test-files';

describe('DrawableTextInterlineSpacing', () => {
    it('should write text with default interline spacing', () => {
        TestFiles.Images.empty150x150Canvas.use((image) => {
            image.draw([
                new DrawableFont(TestFiles.Fonts.kaushanScriptRegularTtf.name),
                new DrawableFontPointSize(50),
                new DrawableFillColor(new MagickColor('pink')),
                new DrawableText(50, 50, 'I\nI'),
            ]);

            expect(image).toHavePixelWithColor(60, 131, '#ffffffff');
        });
    });

    it('should write text with increased interline spacing', () => {
        TestFiles.Images.empty150x150Canvas.use((image) => {
            image.draw([
                new DrawableFont(TestFiles.Fonts.kaushanScriptRegularTtf.name),
                new DrawableFontPointSize(50),
                new DrawableFillColor(new MagickColor('pink')),
                new DrawableTextInterlineSpacing(10),
                new DrawableText(50, 50, 'I\nI'),
            ]);

            expect(image).toHavePixelWithColor(60, 131, '#ffc0cbff');
        });
    });

    it('should write text with negative interline spacing', () => {
        TestFiles.Images.empty150x150Canvas.use((image) => {
            image.draw([
                new DrawableFont(TestFiles.Fonts.kaushanScriptRegularTtf.name),
                new DrawableFontPointSize(50),
                new DrawableFillColor(new MagickColor('pink')),
                new DrawableTextInterlineSpacing(-30),
                new DrawableText(50, 50, 'I\nI'),
            ]);

            expect(image).toHavePixelWithColor(68, 59, '#ffc0cbff');
        });
    });
});
