/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DrawableText } from '@src/drawing/drawable-text';
import { DrawableFillColor } from '@src/drawing/drawable-fill-color';
import { DrawableFont } from '@src/drawing/drawable-font';
import { DrawableFontPointSize } from '@src/drawing/drawable-font-point-size';
import { MagickColor } from '@src/magick-color';
import { TestFiles } from '@test/test-files';

describe('DrawableText', () => {
    it('should write text to the image', () => {
        TestFiles.Images.empty150x150Canvas.use((image) => {
            image.draw([
                new DrawableFont(TestFiles.Fonts.kaushanScriptRegularTtf.name),
                new DrawableFontPointSize(100),
                new DrawableFillColor(new MagickColor('pink')),
                new DrawableText(0, 109, 'X'),
            ])

            expect(image).toHavePixelWithColor(44, 74, '#ffc0cb');
        });
    });
});
