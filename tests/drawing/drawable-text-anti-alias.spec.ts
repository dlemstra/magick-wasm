/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DrawableFont } from '@src/drawing/drawable-font';
import { DrawableFontPointSize } from '@src/drawing/drawable-font-point-size';
import { DrawableText } from '@src/drawing/drawable-text';
import { DrawableTextAntiAlias } from '@src/drawing/drawable-text-anti-alias';
import { TestFiles } from '@test/test-files';

describe('DrawableTextAntialias', () => {
    it('should write text with antialias to the image', () => {
        TestFiles.Images.empty150x150Canvas.use((image) => {
            image.draw([
                new DrawableFont(TestFiles.Fonts.kaushanScriptRegularTtf.name),
                new DrawableFontPointSize(80),
                new DrawableText(0, 100, 'Test'),
            ]);

            expect(image).toHavePixelWithColor(95, 68, '#4c4c4c');
        });
    });

    it('should write text without antialias to the image', () => {
        TestFiles.Images.empty150x150Canvas.use((image) => {
            image.draw([
                new DrawableFont(TestFiles.Fonts.kaushanScriptRegularTtf.name),
                new DrawableFontPointSize(80),
                DrawableTextAntiAlias.disabled,
                new DrawableText(0, 100, 'Test'),
            ]);

            expect(image).toHavePixelWithColor(95, 68, '#000000');
        });
    });

    it('should use the settings to write text antialias antialias to the image', () => {
        TestFiles.Images.empty150x150Canvas.use((image) => {
            image.settings.textAntiAlias = false;
            image.draw([
                new DrawableFont(TestFiles.Fonts.kaushanScriptRegularTtf.name),
                new DrawableFontPointSize(80),
                new DrawableText(0, 100, 'Test'),
            ]);

            expect(image).toHavePixelWithColor(95, 68, '#000000');
        });
    });
});
