/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ColorType } from '@src/enums/color-type';
import { MagickColors } from '@src/magick-colors';
import { TestFiles } from '@test/test-files';

describe('PixelCollection#getColor', () => {
    it('should return color of the pixel for grayscale', () => {
        TestFiles.Images.Builtin.logo.use((image) => {
            image.colorType = ColorType.Grayscale;

            expect(image.channelCount).toBe(1);

            image.getPixels(pixels => {
                const color = pixels.getColor(350, 270);
                expect(color).not.toBeNull();
                expect(color?.toString()).toBe('#3e3e3eff');
            });
        });
    });

    it('should return color of the pixel for grayscale alpha', () => {
        TestFiles.Images.Builtin.logo.use((image) => {
            image.opaque(MagickColors.White, MagickColors.Transparent);

            image.colorType = ColorType.GrayscaleAlpha;

            expect(image.channelCount).toBe(2);

            image.getPixels(pixels => {
                const color = pixels.getColor(400, 300);
                expect(color).not.toBeNull();
                expect(color?.toString()).toBe('#00000000');
            });
        });
    });

    it('should return color of the pixel for rgb image', () => {
        TestFiles.Images.Builtin.logo.use((image) => {
            image.getPixels(pixels => {
                const color = pixels.getColor(0, 0);
                expect(color).not.toBeNull();
                expect(color?.toString()).toBe('#ffffffff');
            });
        });
    });

    it('should return color of the pixel for rgba image', () => {
        TestFiles.Images.Builtin.logo.use((image) => {
            image.opaque(MagickColors.White, MagickColors.Transparent);

            expect(image.channelCount).toBe(4);

            image.getPixels(pixels => {
                const color = pixels.getColor(400, 300);
                expect(color).not.toBeNull();
                expect(color?.toString()).toBe('#00000000');
            });
        });
    });

    it('should return color of the pixel for cmyk image', () => {
        TestFiles.Images.Builtin.logo.use((image) => {
            const rgbProfile = TestFiles.Profiles.Color.SRGB.load();
            const cmykProfile = TestFiles.Profiles.Color.USWebCoatedSWOP.load();
            image.transformColorSpace(rgbProfile, cmykProfile);

            expect(image.channelCount).toBe(4);

            image.getPixels(pixels => {
                const color = pixels.getColor(350, 270);
                expect(color).not.toBeNull();
                expect(color?.isCmyk).toBe(true);
                expect(color?.toString()).toBe('cmyka(254,231,34,5,1.0000)');
            });
        });
    });

    it('should return color of the pixel for cmyka image', () => {
        TestFiles.Images.Builtin.logo.use((image) => {
            image.opaque(MagickColors.White, MagickColors.Transparent);

            const rgbProfile = TestFiles.Profiles.Color.SRGB.load();
            const cmykProfile = TestFiles.Profiles.Color.USWebCoatedSWOP.load();
            image.transformColorSpace(rgbProfile, cmykProfile);

            expect(image.channelCount).toBe(5);

            image.getPixels(pixels => {
                const color = pixels.getColor(400, 300);
                expect(color).not.toBeNull();
                expect(color?.toString()).toBe('cmyka(189,174,170,229,0.0000)');
            });
        });
    });
});
