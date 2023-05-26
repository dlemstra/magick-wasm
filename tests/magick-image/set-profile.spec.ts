// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { IMagickImage, MagickImage } from '../../src/magick-image';
import { TestImages } from '../test-images';

let image: IMagickImage;

beforeEach(() => {
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#setProfile', () => {
    it('should throw error when array is empty', () => {
        expect(() => {
            image.setProfile('icc', new Uint8Array());
        }).toThrowError('The specified array cannot be empty');
    });

    it('should add the profile', () => {
        TestImages.fujiFilmFinePixS1ProJpg.use(sourceImage => {
            const profile = sourceImage.getProfile('icc');
            expect(profile).not.toBeNull();

            if (profile !== null) {
                expect(profile.name).toEqual('icc');
                const profileData = profile.getData();
                expect(profileData).not.toBeNull();

                if (profileData !== null) {
                    expect(profileData.length).toBe(3144);
                    image.setProfile('icc', profileData);
                    const profile = image.getProfile('icc');
                    expect(profile).not.toBeNull();

                    if (profile !== null) {
                        expect(profile.name).toEqual('icc');
                        const data = profile.getData();
                        expect(data).not.toBeNull();

                        if (data !== null)
                            expect(data.length).toBe(3144);
                    }
                }
            }
        });
    });
});