/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ColorSpace } from '@src/enums/color-space';
import { ColorTransformMode } from '@src/enums/color-transform-mode';
import { TestFiles } from '@test/test-files';

describe('MagickImage#transformColorSpace', () => {
    it('should return false when the image has no color profile', () => {
        TestFiles.Images.Builtin.logo.use((image) => {
            const target = TestFiles.Profiles.Color.SRGB.load();
            const result = image.transformColorSpace(target);
            expect(result).toBe(false);
        });
    });

    it('should use the color profile of the image', () => {
        TestFiles.Images.fujiFilmFinePixS1ProJpg.use((image) => {
            const target = TestFiles.Profiles.Color.USWebCoatedSWOP.load();
            const result = image.transformColorSpace(target);
            expect(result).toBe(true);
        });
    });

    it('should return false when the source profile color space is different', () => {
        TestFiles.Images.fujiFilmFinePixS1ProJpg.use((image) => {
            const source = TestFiles.Profiles.Color.USWebCoatedSWOP.load();
            const target = TestFiles.Profiles.Color.SRGB.load();
            const result = image.transformColorSpace(source, target);
            expect(result).toBe(false);
        });
    });

    it('should return true when the the colorspace could be transformed', () => {
        TestFiles.Images.fujiFilmFinePixS1ProJpg.use((image) => {
            const source = TestFiles.Profiles.Color.SRGB.load();
            const target = TestFiles.Profiles.Color.USWebCoatedSWOP.load();
            const result = image.transformColorSpace(source, target);
            expect(result).toBe(true);
        });
    });

    it('should change the colorspace of the image', () => {
        TestFiles.Images.imageMagickJpg.use((image) => {
            expect(image.colorSpace).toBe(ColorSpace.sRGB);

            const source = TestFiles.Profiles.Color.SRGB.load();
            const target = TestFiles.Profiles.Color.USWebCoatedSWOP.load();
            const result = image.transformColorSpace(source, target);
            expect(result).toBe(true);
            expect(image.colorSpace).toBe(ColorSpace.CMYK);
        });
    });

    it('should use quantum color transform mode by default', () => {
        const source = TestFiles.Profiles.Color.SRGB.load();
        const target = TestFiles.Profiles.Color.CoatedFOGRA39.load();

        TestFiles.Images.Color.white.use((image) => {
            image.transformColorSpace(source, target);
            const result = image.formatExpression('%[pixel:u]');
            expect(result).toBe('cmyk(0,0,0,0)');
        });
    });

    it('should support high res transform mode', () => {
        const source = TestFiles.Profiles.Color.SRGB.load();
        const target = TestFiles.Profiles.Color.CoatedFOGRA39.load();

        TestFiles.Images.Color.white.use((image) => {
            image.transformColorSpace(source, target, ColorTransformMode.HighRes);
            const result = image.formatExpression('%[pixel:u]');
            expect(result).toBe('cmyk(0,1,0,0)');
        });
    });
});
