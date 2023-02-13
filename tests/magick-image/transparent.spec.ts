// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Gravity } from '../../src/gravity';
import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import { MagickColor } from '../../src/magick-color';
import { MagickColors } from '../../src/magick-colors';
import { MagickGeometry } from '../../src/magick-geometry';
import '../custom-matcher'

let image: IMagickImage;

beforeAll(() => { ImageMagick._api = global.native; });

beforeEach(() => {
    image = MagickImage.create();
    image.read(MagickColors.Red, 1, 1);
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#transparent', () => {
    it('should change pixels with matching color to transparent', () => {
        image.extent(new MagickGeometry('1x2'), Gravity.South, MagickColors.White)

        image.transparent(MagickColors.Red);

        expect(image).toHavePixelWithColor(0, 0, MagickColors.White);
        expect(image).toHavePixelWithColor(0, 1, new MagickColor('#ff000000'));
    });
});
