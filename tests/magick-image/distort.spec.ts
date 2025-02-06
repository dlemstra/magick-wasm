/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { DistortMethod } from '@src/enums/distort-method';
import { DistortSettings } from '@src/settings/distort-settings';
import { MagickAlphaOption } from '@src/enums/magick-alpha-option';
import { VirtualPixelMethod } from '@src/enums/virtual-pixel-method';
import { TestFiles } from '@test/test-files';

describe('MagickImage#distort', () => {
    it('should throw error when params is empty', () => {
        expect(() => {
            TestFiles.Images.empty.use(image => {
                image.distort(DistortMethod.PerspectiveProjection, []);
            });
        }).toThrowError('The specified array cannot be empty');
    });

    it('should distort the image', () => {
        TestFiles.Images.Builtin.rose.use(image => {
            image.alpha(MagickAlphaOption.Set);
            image.virtualPixelMethod = VirtualPixelMethod.Transparent;
            image.distort(DistortMethod.PerspectiveProjection, [1.40, 0.25, 3.0, 0.15, 1.30, 0.0, 0.007, 0.009]);

            expect(image.width).toBe(70);
            expect(image.height).toBe(46);
            expect(image).toHavePixelWithColor(4, 15, '#00000000');
            expect(image).toHavePixelWithColor(55, 15, '#fd4b7b');
            expect(image).toHavePixelWithColor(66, 15, '#00000000');
        });
    });

    it('should distort the image with the settings', () => {
        TestFiles.Images.Builtin.rose.use(image => {
            image.alpha(MagickAlphaOption.Set);
            image.virtualPixelMethod = VirtualPixelMethod.Transparent;

            const settings = new DistortSettings(DistortMethod.PerspectiveProjection);
            settings.bestFit = true;

            image.distort(settings, [1.40, 0.25, 3.0, 0.15, 1.30, 0.0, 0.007, 0.009]);

            expect(image.width).toBe(67);
            expect(image.height).toBe(44);
            expect(image).toHavePixelWithColor(4, 15, '#38352f');
            expect(image).toHavePixelWithColor(55, 15, '#ed5a75');
            expect(image).toHavePixelWithColor(66, 15, '#00000000');
        });
    });
});
