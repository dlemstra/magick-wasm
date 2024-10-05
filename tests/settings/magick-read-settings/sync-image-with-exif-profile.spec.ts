/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { MagickReadSettings } from '@src/settings/magick-read-settings';

describe('MagickReadSettings#syncImageWithExifProfile', () => {
    it('should return true as the default value', () => {
        const settings = new MagickReadSettings();

        expect(settings.syncImageWithExifProfile).toBe(true);
    });

    it('should not set the define when the value is not set', () => {
        const settings = new MagickReadSettings();
        const value = settings.getDefine('exif:sync-image');

        expect(value).toBeNull();
    });

    it('should change the image option', () => {
        const settings = new MagickReadSettings();
        settings.syncImageWithExifProfile = false;

        const value = settings.getDefine('exif:sync-image');
        expect(value).toBe('false');
    });
});
