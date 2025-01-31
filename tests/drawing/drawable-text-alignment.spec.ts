/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DrawableFont } from '@src/drawing/drawable-font';
import { DrawableFontPointSize } from '@src/drawing/drawable-font-point-size';
import { DrawableText } from '@src/drawing/drawable-text';
import { DrawableTextAlignment } from '@src/drawing/drawable-text-alignment';
import { TestFiles } from '@test/test-files';
import { TextAlignment } from '@src/enums/text-alignment';

describe('DrawableTextAlignment', () => {
    it('should write text without alignment to the image', () => {
        TestFiles.Images.empty150x150Canvas.use((image) => {
            image.draw([
                new DrawableFont(TestFiles.Fonts.kaushanScriptRegularTtf.name),
                new DrawableFontPointSize(80),
                new DrawableText(0, 100, 'Test'),
            ]);

            expect(image).toHavePixelWithColor(126, 75, '#000000');
            expect(image).toHavePixelWithColor(49, 79, '#ffffff');
        });
    });

    it('should write text with alignment to the image', () => {
        TestFiles.Images.empty150x150Canvas.use((image) => {
            image.draw([
                new DrawableFont(TestFiles.Fonts.kaushanScriptRegularTtf.name),
                new DrawableFontPointSize(80),
                new DrawableTextAlignment(TextAlignment.Center),
                new DrawableText(0, 100, 'Test'),
            ]);

            expect(image).toHavePixelWithColor(126, 75, '#ffffff');
            expect(image).toHavePixelWithColor(49, 79, '#000000');
        });
    });
});
