/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DrawableFont } from '@src/drawing/drawable-font';
import { DrawableFontPointSize } from '@src/drawing/drawable-font-point-size';
import { DrawableText } from '@src/drawing/drawable-text';
import { DrawableTextAntialias } from '@src/drawing/drawable-text-antialias';
import { TestFonts } from '@test/test-fonts';
import { TestImages } from '@test/test-images';

describe('DrawableTextAntialias', () => {
    it('should write text with antialias to the image', () => {
        TestImages.empty150x150Canvas.use((image) => {
            image.draw([
                new DrawableFont(TestFonts.kaushanScriptRegularTtf.name),
                new DrawableFontPointSize(80),
                new DrawableText(0, 100, 'Test'),
            ]);

            expect(image).toHavePixelWithColor(95, 68, '#4c4c4cff');
        });
    });

    it('should write text without antialias to the image', () => {
        TestImages.empty150x150Canvas.use((image) => {
            image.draw([
                new DrawableFont(TestFonts.kaushanScriptRegularTtf.name),
                new DrawableFontPointSize(80),
                DrawableTextAntialias.disabled,
                new DrawableText(0, 100, 'Test'),
            ]);

            expect(image).toHavePixelWithColor(95, 68, '#000000ff');
        });
    });
});
