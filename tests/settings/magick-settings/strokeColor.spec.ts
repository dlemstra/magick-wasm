// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
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

describe('MagickSettings#strokeColor', () => {
    it('should use the correct stroke color', () => {
        const data = fs.readFileSync(TestFiles.kaushanScriptRegularTtf);
        Magick.addFont('test', data);

        const settings = new MagickReadSettings();
        settings.font = 'test';
        settings.fontPointsize = 100;
        settings.strokeColor = new MagickColor('pink');

        ImageMagick.read('label:X', settings, (image) => {
            expect(image.width).toBe(76);
            expect(image.height).toBe(147);
            colorAssert(image, 39, 75, '#ffc0cbff');
        });
    });
});
