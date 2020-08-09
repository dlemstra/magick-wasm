/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from '../../../src/image-magick';
import { MagickImage } from '../../../src/magick-image';
import { PixelCollection } from '../../../src/pixels/pixel-collection';

let image: MagickImage;
let pixels: PixelCollection;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
    image.read('logo:');
    pixels = PixelCollection._create(image);
});

afterEach(() => {
    image.dispose();
    pixels.dispose();
});

describe('PixelCollection#toByteArray', () => {
    it('should return array with the correct size', () => {
        const data = pixels.toByteArray(0, 0, 2, 3, 'rgb');
        expect(data).not.toBeNull();
        expect(data!.length).toBe(18);
    });
});