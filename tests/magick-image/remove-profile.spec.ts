// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { TestImages } from '../test-images';

describe('MagickImage#removeProfile', () => {
    it('should remove the profile from the image', () => {
        TestImages.fujiFilmFinePixS1ProJpg.use(image => {
            let profile = image.getProfile('icc');
            expect(profile).not.toBeNull();
            if (profile !== null) {
                expect(profile.name).toEqual('icc');
                image.removeProfile('icc');
                profile = image.getProfile('icc');
                expect(profile).toBeNull();
            }
        });
    });
});
