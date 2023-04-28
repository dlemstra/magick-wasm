// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../../src/image-magick';
import { MagickReadSettings } from '../../../src/settings/magick-read-settings';
import { TestFiles } from '../../test-files';

beforeAll(() => { ImageMagick._api = global.native; });

describe('MagickSettings#fontPointSize', () => {
    it('should change the size of the rendered text', () => {
        const settings = new MagickReadSettings();
        settings.font = TestFiles.Fonts.kaushanScriptRegularTtf.name;
        settings.fontPointsize = 90;

        ImageMagick.read('label:magick-wasm', settings, (image) => {
            expect(image.width).toBe(529);
            expect(image.height).toBe(133);
        });
    });
});
