// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { DrawableFillColor } from '../../src/drawables/drawable-fill-color';
import { DrawableFont } from '../../src/drawables/drawable-font';
import { DrawableFontPointSize } from '../../src/drawables/drawable-font-point-size';
import { DrawableText } from '../../src/drawables/drawable-text';
import { DrawableTextKerning } from '../../src/drawables/drawable-text-kerning';
import { MagickColor } from '../../src/magick-color';
import { TestFonts } from '../test-fonts';
import { TestImages } from '../test-images';

describe('DrawableTextKerning', () => {
    it('should write text with kerning to the image', () => {
        TestImages.empty150x150Canvas.use((image) => {
            image.draw([
                new DrawableFont(TestFonts.kaushanScriptRegularTtf.name),
                new DrawableFontPointSize(100),
                new DrawableFillColor(new MagickColor('pink')),
                new DrawableTextKerning(10),
                new DrawableText(0, 109, 'I I'),
            ]);

            expect(image).toHavePixelWithColor(100, 80, '#ffc0cbff');
        });
    });

    it('should write text without kerning to the image', () => {
        TestImages.empty150x150Canvas.use((image) => {
            image.draw([
                new DrawableFont(TestFonts.kaushanScriptRegularTtf.name),
                new DrawableFontPointSize(100),
                new DrawableFillColor(new MagickColor('pink')),
                new DrawableText(0, 109, 'I I'),
            ]);

            expect(image).toHavePixelWithColor(100, 80, '#ffffffff');
        });
    });
});
