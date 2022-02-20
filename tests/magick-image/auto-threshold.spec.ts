// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { AutoThresholdMethod } from '../../src/auto-threshold-method';
import { ImageMagick } from '../../src/image-magick';
import { MagickColors } from '../../src/magick-colors';
import { IMagickImage, MagickImage } from '../../src/magick-image';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
    image.read('logo:');
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#autoThreshold', () => {
    it('should threshold the image', () => {
        image.autoThreshold(AutoThresholdMethod.OTSU);

        const histogram = image.histogram();
        expect(histogram.size).toBe(2);
        expect(histogram.get(MagickColors.Black.toString())).toBe(39359);
        expect(histogram.get(MagickColors.White.toString())).toBe(267841);
    });
});
