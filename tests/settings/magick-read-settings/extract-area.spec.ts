/*
  Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
  Licensed under the Apache License, Version 2.0.
*/

import { ImageMagick } from '@src/image-magick';
import { MagickGeometry } from '@src/types/magick-geometry';
import { MagickReadSettings } from '@src/settings/magick-read-settings';

describe('MagickReadSettings#extractArea', () => {
    it('should only read the specified area of the image', () => {
        const settings = new MagickReadSettings();
        settings.extractArea = new MagickGeometry(350, 260, 100, 100);

        ImageMagick.read('logo:', settings, (image) => {
            expect(image.width).toBe(100);
            expect(image.height).toBe(100);

            expect(image).toHavePixelWithColor(0, 0, '#223e92');
        });
    });

    it('should not outside the image', () => {
        const settings = new MagickReadSettings();
        settings.extractArea = new MagickGeometry(600, 400, 100, 100);

        ImageMagick.read('logo:', settings, (image) => {
            expect(image.width).toBe(40);
            expect(image.height).toBe(80);

            expect(image).toHavePixelWithColor(0, 0, '#ffffff');
        });
    });
});
