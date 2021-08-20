// Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { Magick } from '../../src/magick';
import { MagickReadSettings } from '../../src/settings/magick-read-settings';
import { TestFiles } from '../test-files';
import * as fs from 'fs';

beforeAll(() => { ImageMagick._api = (global as any).native; });

describe('Magick#addFont', () => {
    it('should make the font available', () => {
        const data = fs.readFileSync(TestFiles.kaushanScriptRegularTtf);

        Magick.addFont('foo', data);

        const settings = new MagickReadSettings();
        settings.font = 'foo';

        ImageMagick.read('label:magick-wasm', settings, (image) => {
            expect(image.width).toBe(69);
            expect(image.height).toBe(20);
        });
    });
});
