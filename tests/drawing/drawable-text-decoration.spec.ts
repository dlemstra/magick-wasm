/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DrawableFont } from '@src/drawing/drawable-font';
import { DrawableFontPointSize } from '@src/drawing/drawable-font-point-size';
import { DrawableText } from '@src/drawing/drawable-text';
import { DrawableTextDecoration } from '@src/drawing/drawable-text-decoration';
import { TestFiles } from '@test/test-files';
import { TextDecoration } from '@src/enums/text-decoration';

describe('DrawableTextDecoration', () => {
    it('should write text without decoration to the image', () => {
        TestFiles.Images.empty150x150Canvas.use((image) => {
            image.draw([
                new DrawableFont(TestFiles.fonts.kaushanScriptRegularTtf.name),
                new DrawableFontPointSize(80),
                new DrawableText(0, 100, 'Test'),
            ]);

            expect(image).toHavePixelWithColor(88, 109, '#ffffffff');
        });
    });

    it('should write text with decoration to the image', () => {
        TestFiles.Images.empty150x150Canvas.use((image) => {
            image.draw([
                new DrawableFont(TestFiles.fonts.kaushanScriptRegularTtf.name),
                new DrawableFontPointSize(80),
                new DrawableTextDecoration(TextDecoration.Underline),
                new DrawableText(0, 100, 'Test'),
            ]);

            expect(image).toHavePixelWithColor(88, 109, '#000000ff');
        });
    });
});
