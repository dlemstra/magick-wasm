// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { MagickReadSettings } from '../../src/settings/magick-read-settings';
import { TestFiles } from '../test-files';

describe('Magick#addFont', () => {
    it('should make the font available', () => {
        const settings = new MagickReadSettings();
        settings.font = TestFiles.Fonts.kaushanScriptRegularTtf.name;

        ImageMagick.read('label:magick-wasm', settings, (image) => {
            expect(image.width).toBe(73);
            expect(image.height).toBe(20);
        });
    });
});
