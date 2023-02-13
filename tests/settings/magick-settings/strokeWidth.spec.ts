// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../../src/image-magick';
import { Magick } from '../../../src/magick';
import { MagickColor } from '../../../src/magick-color';
import { MagickReadSettings } from '../../../src/settings/magick-read-settings';
import { TestFiles } from '../../test-files';
import '../../custom-matcher';

beforeAll(() => { ImageMagick._api = global.native; });

describe('MagickSettings#strokeWidth', () => {
    it('should use the correct stroke width', () => {
        const data = TestFiles.kaushanScriptRegularTtf.toBufferSync();
        Magick.addFont('test', data);

        const settings = new MagickReadSettings();
        settings.font = 'test';
        settings.fontPointsize = 100;
        settings.strokeColor = new MagickColor('pink');
        settings.strokeWidth = 5;

        ImageMagick.read('label:X', settings, (image) => {
            expect(image.width).toBe(80);
            expect(image.height).toBe(151);
            expect(image).toHavePixelWithColor(11, 108, '#000000ff');
            expect(image).toHavePixelWithColor(26, 41, '#000000ff');
            expect(image).toHavePixelWithColor(50, 110, '#000000ff');
            expect(image).toHavePixelWithColor(71, 44, '#000000ff');
        });
    });
});
