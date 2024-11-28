/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('MagickImage#removeProfile', () => {
    it('should remove the profile by name from the image', () => {
        TestFiles.Images.fujiFilmFinePixS1ProJpg.use(image => {
            let profile = image.getProfile('icc');
            profile = expectToNotBeNull(profile);
            expect(profile.name).toEqual('icc');

            image.removeProfile('icc');

            profile = image.getProfile('icc');

            expect(profile).toBeNull();
        });
    });

    it('should remove the profile from the image', () => {
        TestFiles.Images.fujiFilmFinePixS1ProJpg.use(image => {
            let profile = image.getProfile('icc');
            profile = expectToNotBeNull(profile);

            image.removeProfile(profile);

            profile = image.getProfile('icc');

            expect(profile).toBeNull();
        });
    });
});
