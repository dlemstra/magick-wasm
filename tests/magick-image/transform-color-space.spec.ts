/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

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
});
