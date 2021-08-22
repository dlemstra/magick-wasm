// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { AlphaOption } from '../../src/alpha-option';
import { DistortMethod } from '../../src/distort-method';
import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import { VirtualPixelMethod } from '../../src/virtual-pixel-method';
import '../custom-matcher';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
    image.read('rose:');
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#distort', () => {
    it('should distort the image', () => {
        image.alpha(AlphaOption.Set);
        image.virtualPixelMethod = VirtualPixelMethod.Transparent;
        image.distort(DistortMethod.PerspectiveProjection, [1.40, 0.25, 3.0, 0.15, 1.30, 0.0, 0.007, 0.009]);

        expect(image.width).toBe(70);
        expect(image.height).toBe(46);
        expect(image).toHavePixelWithColor(4, 15, '#00000000');
        expect(image).toHavePixelWithColor(55, 15, '#fd4b7bff');
        expect(image).toHavePixelWithColor(66, 15, '#00000000');
    });
});
