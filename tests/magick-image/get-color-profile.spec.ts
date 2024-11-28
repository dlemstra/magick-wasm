/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ColorSpace } from '@src/enums/color-space';
import { ImageMagick } from '@src/image-magick';
import { MagickColors } from '@src/magick-colors';
import { TestFiles } from '@test/test-files';

describe('MagickImage#getColorProfile', () => {
    it('should return null when image does not contain color profile', () => {
        ImageMagick.read(MagickColors.Black, 1, 1, (image) => {
            const profile = image.getColorProfile();
            expect(profile).toBeNull();
        });
    });

    it('should return the specified profile', () => {
        TestFiles.Images.fujiFilmFinePixS1ProJpg.use(image => {
            let profile = image.getColorProfile();
            profile = expectToNotBeNull(profile);
            expect(profile.name).toEqual('icc');
            expect(profile.data.length).toBe(3144);
            expect(profile.colorSpace).toBe(ColorSpace.sRGB);
            expect(profile.description).toBe('sRGB IEC61966-2.1');
            expect(profile.manufacturer).toBe('IEC http://www.iec.ch');
            expect(profile.model).toBe('IEC 61966-2.1 Default RGB colour space - sRGB');
        });
    });
});
