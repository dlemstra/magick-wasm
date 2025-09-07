/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DrawableAffine } from '@src/drawing/drawable-affine';
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
            ]);

            expect(image).toHavePixelWithColor(44, 74, '#ffc0cb');
        });
    });

    it('should use the affine', () => {
        TestFiles.Images.empty150x150Canvas.use((image) => {
            image.settings.affine = new DrawableAffine(2, 3, 4, 5, 6, 7);
            image.draw([
                new DrawableFont(TestFiles.Fonts.kaushanScriptRegularTtf.name),
                new DrawableText(10, 10, 'test'),
            ]);

            expect(image).toHavePixelWithColor(50, 69, '#fff');
            expect(image).toHavePixelWithColor(53, 73, '#000');
            expect(image).toHavePixelWithColor(86, 131, '#fff');
            expect(image).toHavePixelWithColor(80, 125, '#000');
        });
    });
});
