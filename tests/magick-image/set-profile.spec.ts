/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { TestFiles } from '@test/test-files';

describe('MagickImage#setProfile', () => {
    it('should throw error when array is empty', () => {
        expect(() => {
            TestFiles.Images.empty.use(image => {
                image.setProfile('icc', new Uint8Array());
            });
        }).toThrowError('The specified array cannot be empty');
    });

    it('should add the profile by name', () => {
        TestFiles.Images.fujiFilmFinePixS1ProJpg.use(sourceImage => {
            let profile = sourceImage.getProfile('icc');
            profile = expectToNotBeNull(profile);
            expect(profile.name).toEqual('icc');

            const profileData = profile.data;
            expect(profileData.length).toBe(3144);

            TestFiles.Images.empty.use(image => {
                image.setProfile('icc', profileData);
                let profile = image.getProfile('icc');
                profile = expectToNotBeNull(profile);
                expect(profile.name).toEqual('icc');

                let data = profile.data;
                data = expectToNotBeNull(data);
                expect(data.length).toBe(3144);
            });
        });
    });

    it('should add the profile', () => {
        TestFiles.Images.fujiFilmFinePixS1ProJpg.use(sourceImage => {
            let profile = sourceImage.getProfile('icc');

            TestFiles.Images.empty.use(image => {
                profile = expectToNotBeNull(profile);
                image.setProfile(profile);

                profile = image.getProfile('icc');
                expectToNotBeNull(profile);
            });
        });
    });
});
