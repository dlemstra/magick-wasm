/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { Gravity } from '@src/enums/gravity';
import { MagickGeometry } from '@src/types/magick-geometry';
import { TestFiles } from '@test/test-files';

describe('MagickImage#annotate', () => {
    it('should draw the text on the image', () => {
        TestFiles.Images.empty150x150Canvas.use(image => {
            image.settings.fontPointsize = 70;
            image.settings.font = TestFiles.Fonts.kaushanScriptRegularTtf.name;
            image.annotate('tESt', Gravity.East);

            expect(image).toHavePixelWithColor(10, 70, '#000000ff');
            expect(image).toHavePixelWithColor(45, 70, '#000000ff');
            expect(image).toHavePixelWithColor(90, 70, '#000000ff');
            expect(image).toHavePixelWithColor(145, 70, '#000000ff');
        });
    });

    it('should use the specified bounding box', () => {
        TestFiles.Images.empty150x150Canvas.use(image => {
            image.settings.fontPointsize = 50;
            image.settings.font = TestFiles.Fonts.kaushanScriptRegularTtf.name;
            image.annotate('tESt', new MagickGeometry(0, 0, 100, 100), Gravity.East);

            expect(image).toHavePixelWithColor(0, 47, '#000000ff');
            expect(image).toHavePixelWithColor(24, 47, '#000000ff');
            expect(image).toHavePixelWithColor(55, 47, '#000000ff');
            expect(image).toHavePixelWithColor(96, 47, '#000000ff');
        });
    });

    it('should use the specified angle', () => {
        TestFiles.Images.empty150x150Canvas.use(image => {
            image.settings.fontPointsize = 70;
            image.settings.font = TestFiles.Fonts.kaushanScriptRegularTtf.name;
            image.annotate('tESt', Gravity.Center, 25);

            expect(image).toHavePixelWithColor(26, 100, '#000000ff');
            expect(image).toHavePixelWithColor(64, 76, '#000000ff');
            expect(image).toHavePixelWithColor(121, 74, '#000000ff');
            expect(image).toHavePixelWithColor(139, 74, '#000000ff');
        });
    });

    it('should use the specified angle and bounding box', () => {
        TestFiles.Images.empty150x150Canvas.use(image => {
            image.settings.fontPointsize = 50;
            image.settings.font = TestFiles.Fonts.kaushanScriptRegularTtf.name;
            image.annotate('tESt', new MagickGeometry(0, 0, 50, 50), Gravity.Center, 100);

            expect(image).toHavePixelWithColor(39, 0, '#000000ff');
            expect(image).toHavePixelWithColor(27, 32, '#000000ff');
            expect(image).toHavePixelWithColor(44, 65, '#000000ff');
        });
    });
});
