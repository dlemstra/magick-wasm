// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { DrawableText } from '../../src/drawables/drawable-text';
import { DrawableFillColor } from '../../src/drawables/drawable-fill-color';
import { DrawableFont } from '../../src/drawables/drawable-font';
import { DrawableFontPointSize } from '../../src/drawables/drawable-font-point-size';
import { MagickColor } from '../../src/magick-color';
import { TestFonts } from '../test-fonts';
import { TestImages } from '../test-images';

describe('DrawableText', () => {
    it('should write text to the image', () => {
        TestImages.emptyCanvas.use((image) => {
            image.draw([
                new DrawableFont(TestFonts.kaushanScriptRegularTtf.name),
                new DrawableFontPointSize(100),
                new DrawableFillColor(new MagickColor('pink')),
                new DrawableText(0, 109, 'X'),
            ])

            expect(image).toHavePixelWithColor(44, 74, '#ffc0cbff');
        });
    });
});
