// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { MagickFormat } from '../../../src/magick-format';
import { MagickReadSettings } from '../../../src/settings/magick-read-settings';
import { MagickSettings } from '../../../src/settings/magick-settings';
import { TestImages } from '../../test-images';

describe('MagickSettings#setDefine', () => {
    it('should change boolean value into a string', () => {
        const settings = new MagickSettings();
        settings.setDefine(MagickFormat.Unknown, 'something', true);

        const result = settings.getDefine('something');

        expect(result).toEqual('true');
    });

    it('should change number value into a string', () => {
        const settings = new MagickSettings();
        settings.setDefine(MagickFormat.Webp, 'method', 1);

        const result = settings.getDefine('WEBP:method');

        expect(result).toEqual('1');
    });

    it('should include the format in the name of the define', () => {
        const settings = new MagickSettings();
        settings.setDefine(MagickFormat.Png, 'foo', 'bar');

        const result = settings.getDefine('PNG:foo');

        expect(result).toEqual('bar');
    });

    it('should use the define when reading the image', async () => {
        const settings = new MagickReadSettings();
        settings.setDefine('profile:skip', 'icc');

        await TestImages.fujiFilmFinePixS1ProJpg.read(settings, image => {
            const profile = image.getProfile('icc');

            expect(profile).toBeNull();
        });
    });
});
