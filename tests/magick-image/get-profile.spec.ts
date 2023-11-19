// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '@src/image-magick';
import { MagickColors } from '@src/magick-colors';
import { TestImages } from '@test/test-images';

describe('MagickImage#getProfile', () => {
    it('should return null when image does not contain profile', () => {
        ImageMagick.read(MagickColors.Black, 1, 1, (image) => {
            const profile = image.getProfile('foo');
            expect(profile).toBeNull();
        });
    });

    it('should return the specified profile', () => {
        TestImages.fujiFilmFinePixS1ProJpg.use(image => {
            let profile = image.getProfile('icc');
            profile = expectToNotBeNull(profile);
            expect(profile.name).toEqual('icc');

            let data = profile.data;
            data = expectToNotBeNull(data);
            expect(data).not.toBeNull();
            expect(data.length).toBe(3144);
        });
    });
});
