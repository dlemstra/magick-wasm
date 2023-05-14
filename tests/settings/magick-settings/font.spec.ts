// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../../src/image-magick';
import { MagickReadSettings } from '../../../src/settings/magick-read-settings';

describe('MagickSettings#font', () => {
    it('should throw exception when font does not exist', () => {
        const settings = new MagickReadSettings();
        settings.font = 'missing';

        expect(() => {
            ImageMagick.read('label:magick-wasm', settings, () => { /* never reached */ });
        }).toThrowError('Unable to find a font with the name \'missing\', add it with Magick.addFont.');
    });
});
