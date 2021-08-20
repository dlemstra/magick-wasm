// Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../../src/image-magick';
import { Magick } from '../../../src/magick';
import { MagickColor } from '../../../src/magick-color';
import { MagickReadSettings } from '../../../src/settings/magick-read-settings';
import { TestFiles } from '../../test-files';
import { colorAssert } from '../../color-assert';
import * as fs from 'fs';

beforeEach(() => {
    ImageMagick._api = (global as any).native;
});

describe('MagickSettings#strokeWidth', () => {
    it('should use the correct stroke width', () => {
        const data = fs.readFileSync(TestFiles.kaushanScriptRegularTtf);
        Magick.addFont('test', data);

        const settings = new MagickReadSettings();
        settings.font = 'test';
        settings.fontPointsize = 100;
        settings.strokeColor = new MagickColor('pink');
        settings.strokeWidth = 5;

        ImageMagick.read('label:X', settings, (image) => {
            expect(image.width).toBe(80);
            expect(image.height).toBe(151);
            colorAssert(image, 11, 108, '#000000ff');
            colorAssert(image, 26, 41, '#000000ff');
            colorAssert(image, 50, 110, '#000000ff');
            colorAssert(image, 71, 44, '#000000ff');
        });
    });
});
