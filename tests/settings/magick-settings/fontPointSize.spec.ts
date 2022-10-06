// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../../src/image-magick';
import { Magick } from '../../../src/magick';
import { MagickReadSettings } from '../../../src/settings/magick-read-settings';
import { TestFiles } from '../../test-files';

beforeEach(() => {
    ImageMagick._api = (global as any).native;
});

describe('MagickSettings#fontPointSize', () => {
    it('should change the size of the rendered text', () => {
        const data = TestFiles.kaushanScriptRegularTtf.toBufferSync();
        Magick.addFont('test', data);

        const settings = new MagickReadSettings();
        settings.font = 'test';
        settings.fontPointsize = 90;

        ImageMagick.read('label:magick-wasm', settings, image => {
            expect(image.width).toBe(529);
            expect(image.height).toBe(133);
        });
    });
});
