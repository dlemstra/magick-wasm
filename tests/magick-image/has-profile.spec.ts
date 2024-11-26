/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestImages } from '@test/test-images';

describe('MagickImage#hasProfile', () => {
    it('should return true when image contains a profile with the specified name', () => {
        TestImages.fujiFilmFinePixS1ProJpg.use(image => {
            image.profileNames.forEach(name => {
                expect(image.hasProfile(name)).toBeTruthy();
            });
        });
    });

    it('should return false when image does not contain a profile with the specified name', () => {
        TestImages.imageMagickJpg.use(image => {
            expect(image.hasProfile('foobar')).toBeFalsy();

            expect(image.hasProfile('8bim')).toBeFalsy();
            expect(image.hasProfile('exif')).toBeFalsy();
            expect(image.hasProfile('icc')).toBeFalsy();
            expect(image.hasProfile('iptc')).toBeFalsy();
            expect(image.hasProfile('xmp')).toBeFalsy();
        });
    });
});
