/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ColorSpace } from '@src/enums/color-space';
import { TestFiles } from '@test/test-files';

describe('MagickImage#formatExpression', () => {
    it('should format the specified expression', () => {
        TestFiles.Images.Color.purple.use(image => {
            let result = image.formatExpression("%[pixel:u]");

            expect(image.colorSpace).toBe(ColorSpace.sRGB);

            expect(result).toBe('srgb(128,0,128)')

            const rgbProfile = TestFiles.Profiles.Color.SRGB.load();
            const cmykProfile = TestFiles.Profiles.Color.USWebCoatedSWOP.load();
            image.transformColorSpace(rgbProfile, cmykProfile);

            result = image.formatExpression("%[pixel:u]");

            expect(result).toBe('cmyk(161,255,47,15)')
        });
    });
});
