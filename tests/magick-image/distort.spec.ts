/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from '../../src/image-magick';
import { MagickImage } from '../../src/magick-image';
import { pixelColor } from '../pixel-color';
import { DistortMethod } from '../../src/distort-method';
import { AlphaOption } from '../../src/alpha-option';
import { VirtualPixelMethod } from '../../src/virtual-pixel-method';

let image: MagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = new MagickImage();
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
        expect(pixelColor(image, 4, 15)).toBe('#00000000');
        expect(pixelColor(image, 55, 15)).toBe('#fd4b7bff');
        expect(pixelColor(image, 66, 15)).toBe('#00000000');
    });
});