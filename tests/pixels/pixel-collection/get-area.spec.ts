/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from '../../../src/image-magick';
import { MagickImage } from '../../../src/magick-image';
import { PixelCollection } from '../../../src/pixels/pixel-collection';

let image: MagickImage;
let pixels: PixelCollection;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = new MagickImage();
    image.read('logo:');
    pixels = PixelCollection._create(image);
});

afterEach(() => {
    image.dispose();
    pixels.dispose();
});

describe('PixelCollection#toByteArray', () => {
    it('should return array with the correct size', () => {
        const data = pixels.getArea(0, 0, 4, 5);
        expect(data).not.toBeNull();
        expect(data!.length).toEqual(80);
    });
});