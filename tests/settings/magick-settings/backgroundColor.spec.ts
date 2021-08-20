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

describe('MagickSettings#backgroundColor', () => {
    it('should use the correct background color', () => {
        const data = fs.readFileSync(TestFiles.kaushanScriptRegularTtf);
        Magick.addFont('test', data);

        const settings = new MagickReadSettings();
        settings.font = 'test';
        settings.backgroundColor = new MagickColor('pink');

        ImageMagick.read('label:magick-wasm', settings, (image) => {
            expect(image.width).toBe(69);
            expect(image.height).toBe(20);
            colorAssert(image, 0, 0, '#ffc0cbff');
        });
    });
});
