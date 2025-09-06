/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DrawableFont } from '@src/drawing/drawable-font';
import { DrawableFontPointSize } from '@src/drawing/drawable-font-point-size';
import { DrawableText } from '@src/drawing/drawable-text';
import { DrawableTextUnderColor } from '@src/drawing/drawable-text-under-color';
import { MagickColors } from '@src/magick-colors';
import { TestFiles } from '@test/test-files';

describe('DrawableTextUnderColor', () => {
    it('should write text without text under color to the image', () => {
        TestFiles.Images.empty150x150Canvas.use((image) => {
            image.draw([
                new DrawableFont(TestFiles.Fonts.kaushanScriptRegularTtf.name),
                new DrawableFontPointSize(80),
                new DrawableText(0, 100, 'I'),
            ]);

            expect(image).toHavePixelWithColor(37, 50, '#ffffff');
            expect(image).toHavePixelWithColor(38, 50, '#ffffff');
            expect(image).toHavePixelWithColor(39, 50, '#ffffff');
        });
    });

    it('should write text with text under color to the image', () => {
        TestFiles.Images.empty150x150Canvas.use((image) => {
            image.draw([
                new DrawableFont(TestFiles.Fonts.kaushanScriptRegularTtf.name),
                new DrawableFontPointSize(80),
                new DrawableTextUnderColor(MagickColors.Pink),
                new DrawableText(0, 100, 'I'),
            ]);

            expect(image).toHavePixelWithColor(37, 50, '#ffc0cb');
            expect(image).toHavePixelWithColor(38, 50, '#fffcfd');
            expect(image).toHavePixelWithColor(39, 50, '#ffffff');
        });
    });

    it('should write text with text under color to the image', () => {
        TestFiles.Images.empty150x150Canvas.use((image) => {
            image.settings.textUnderColor = MagickColors.Pink;
            image.draw([
                new DrawableFont(TestFiles.Fonts.kaushanScriptRegularTtf.name),
                new DrawableFontPointSize(80),
                new DrawableText(0, 100, 'I'),
            ]);

            expect(image).toHavePixelWithColor(37, 50, '#ffc0cb');
            expect(image).toHavePixelWithColor(38, 50, '#fffcfd');
            expect(image).toHavePixelWithColor(39, 50, '#ffffff');
        });
    });
});
