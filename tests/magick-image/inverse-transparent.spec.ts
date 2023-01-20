// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Gravity } from '../../src/gravity';
import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import { MagickColor } from '../../src/magick-color';
import { MagickColors } from '../../src/magick-colors';
import { MagickGeometry } from '../../src/magick-geometry';
import "../custom-matcher"

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = global.native;
    image = MagickImage.create();
    image.read(MagickColors.Red, 1, 1);
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#inverseTransparent', () => {
    it('should change pixels not matching color to transparent', () => {
        image.extent(new MagickGeometry('1x2'), Gravity.South, MagickColors.White)

        image.inverseTransparent(MagickColors.Red);

        expect(image).toHavePixelWithColor(0, 0, new MagickColor("#ffffff00"));
        expect(image).toHavePixelWithColor(0, 1, MagickColors.Red);
    });
});
