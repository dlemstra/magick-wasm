/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DrawableFillColor } from '@src/drawing/drawable-fill-color';
import { DrawableFont } from '@src/drawing/drawable-font';
import { DrawableFontPointSize } from '@src/drawing/drawable-font-point-size';
import { DrawableText } from '@src/drawing/drawable-text';
import { DrawableTextKerning } from '@src/drawing/drawable-text-kerning';
import { MagickColor } from '@src/magick-color';
import { TestFiles } from '@test/test-files';

describe('DrawableTextKerning', () => {
    it('should write text with kerning to the image', () => {
        TestFiles.Images.empty150x150Canvas.use((image) => {
            image.draw([
                new DrawableFont(TestFiles.Fonts.kaushanScriptRegularTtf.name),
                new DrawableFontPointSize(100),
                new DrawableFillColor(new MagickColor('pink')),
                new DrawableTextKerning(10),
                new DrawableText(0, 109, 'I I'),
            ]);

            expect(image).toHavePixelWithColor(100, 80, '#ffc0cbff');
        });
    });

    it('should write text without kerning to the image', () => {
        TestFiles.Images.empty150x150Canvas.use((image) => {
            image.draw([
                new DrawableFont(TestFiles.Fonts.kaushanScriptRegularTtf.name),
                new DrawableFontPointSize(100),
                new DrawableFillColor(new MagickColor('pink')),
                new DrawableText(0, 109, 'I I'),
            ]);

            expect(image).toHavePixelWithColor(100, 80, '#ffffffff');
        });
    });
});
