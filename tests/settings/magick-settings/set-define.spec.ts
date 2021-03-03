// Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../../src/image-magick';
import { MagickReadSettings } from '../../../src/settings/magick-read-settings';
import { MagickSettings } from '../../../src/settings/magick-settings';
import { TestFiles, readTestFile } from '../../test-files';

beforeEach(() => {
    ImageMagick._api = (global as any).native;
});

describe('MagickSettings#setDefine', () => {
    it('should change boolean value into a string', () => {
        const settings = new MagickSettings();
        settings.setDefine('something', true);

        const result = settings.getDefine('something');

        expect(result).toEqual('true');
    });

    it('should use the define when reading the image', async () => {
        const settings = new MagickReadSettings();
        settings.setDefine('profile:skip', 'icc');

        await readTestFile(TestFiles.fujiFilmFinePixS1ProJpg, settings, image => {
            const profile = image.getProfile('icc');

            expect(profile).toBeNull();
        });
    });
});