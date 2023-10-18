// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { TestImages } from '@test/test-images';

describe('MagickImage#setProfile', () => {
    it('should throw error when array is empty', () => {
        expect(() => {
            TestImages.empty.use(image => {
                image.setProfile('icc', new Uint8Array());
            });
        }).toThrowError('The specified array cannot be empty');
    });

    it('should add the profile', () => {
        TestImages.fujiFilmFinePixS1ProJpg.use(sourceImage => {
            let profile = sourceImage.getProfile('icc');
            profile = expectToNotBeNull(profile);
            expect(profile.name).toEqual('icc');

            const profileData = profile.getData();
            expect(profileData.length).toBe(3144);

            TestImages.empty.use(image => {
                image.setProfile('icc', profileData);
                let profile = image.getProfile('icc');
                profile = expectToNotBeNull(profile);
                expect(profile.name).toEqual('icc');

                let data = profile.getData();
                data = expectToNotBeNull(data);
                expect(data.length).toBe(3144);
            });
        });
    });
});
