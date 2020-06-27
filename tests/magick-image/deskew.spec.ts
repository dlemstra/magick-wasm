/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from '../../src/image-magick';
import { MagickImage } from '../../src/magick-image';
import { Percentage } from '../../src/percentage';
import { pixelColor } from '../pixel-color';

let image: MagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = new MagickImage();
    image.read('logo:');
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#deskew', () => {
    it('should rotate the image', () => {
        image.deskew(new Percentage(4.2));

        expect(pixelColor(image, 158, 16)).toBe('#000000ff');
    });

    it('should return the angle', () => {
        const angle = image.deskew(new Percentage(42));
        expect(angle).toEqual(0.8951737102110744);
    });
});