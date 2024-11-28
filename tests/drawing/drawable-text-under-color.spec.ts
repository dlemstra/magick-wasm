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
import { TestImages } from '@test/test-images';

describe('DrawableTextUnderColor', () => {
    it('should write text without text under color to the image', () => {
        TestImages.empty150x150Canvas.use((image) => {
            image.draw([
                new DrawableFont(TestFiles.fonts.kaushanScriptRegularTtf.name),
                new DrawableFontPointSize(80),
                new DrawableText(0, 100, 'I'),
            ]);

            expect(image).toHavePixelWithColor(37, 50, '#ffffffff');
            expect(image).toHavePixelWithColor(38, 50, '#ffffffff');
            expect(image).toHavePixelWithColor(39, 50, '#ffffffff');
        });
    });

    it('should write text with text under color to the image', () => {
        TestImages.empty150x150Canvas.use((image) => {
            image.draw([
                new DrawableFont(TestFiles.fonts.kaushanScriptRegularTtf.name),
                new DrawableFontPointSize(80),
                new DrawableTextUnderColor(MagickColors.Pink),
                new DrawableText(0, 100, 'I'),
            ]);

            expect(image).toHavePixelWithColor(37, 50, '#ffc0cbff');
            expect(image).toHavePixelWithColor(38, 50, '#fffcfdff');
            expect(image).toHavePixelWithColor(39, 50, '#ffffffff');
        });
    });
});
