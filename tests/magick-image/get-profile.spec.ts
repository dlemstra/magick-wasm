/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ImageMagick } from '@src/image-magick';
import { MagickColors } from '@src/magick-colors';
import { TestFiles } from '@test/test-files';

describe('MagickImage#getProfile', () => {
    it('should return null when image does not contain profile', () => {
        ImageMagick.read(MagickColors.Black, 1, 1, (image) => {
            const profile = image.getProfile('foo');
            expect(profile).toBeNull();
        });
    });

    it('should return the specified profile', () => {
        TestFiles.Images.fujiFilmFinePixS1ProJpg.use(image => {
            let profile = image.getProfile('icc');
            profile = expectToNotBeNull(profile);
            expect(profile.name).toEqual('icc');
            expect(profile.data.length).toBe(3144);
        });
    });
});
