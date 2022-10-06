// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { Magick } from '../../src/magick';
import { MagickReadSettings } from '../../src/settings/magick-read-settings';
import { TestFiles } from '../test-files';

beforeAll(() => { ImageMagick._api = global.native; });

describe('Magick#addFont', () => {
    it('should make the font available', () => {
        const data = TestFiles.kaushanScriptRegularTtf.toBufferSync();
        Magick.addFont('foo', data);

        const settings = new MagickReadSettings();
        settings.font = 'foo';

        ImageMagick.read('label:magick-wasm', settings, image => {
            expect(image.width).toBe(73);
            expect(image.height).toBe(20);
        });
    });
});
