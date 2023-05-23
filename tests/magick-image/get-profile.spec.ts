// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { MagickColors } from '../../src/magick-colors';
import { TestImages } from '../test-images';

describe('MagickImage#getProfile', () => {
    it('should return null when image does not contain profile', () => {
        ImageMagick.read(MagickColors.Black, 1, 1, (image) => {
            const profile = image.getProfile('foo');
            expect(profile).toBeNull();
        });
    });

    it('should return the specified profile', () => {
        TestImages.fujiFilmFinePixS1ProJpg.use(image => {

            const profile = image.getProfile('icc');
            expect(profile).not.toBeNull();
            if (profile !== null) {
                expect(profile.name).toEqual('icc');

                const data = profile.getData();
                expect(data).not.toBeNull();
                if (data !== null)
                    expect(data.length).toBe(3144);
            }
        });
    });
});
