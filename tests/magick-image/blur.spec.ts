/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from '../../src/image-magick';
import { MagickImage } from '../../src/magick-image';
import { pixelColor } from '../pixel-color';
import { Channels } from '../../src/channels';

let image: MagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = new MagickImage();
    image.read('logo:');
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#blur', () => {
    it('should change pixels of the image', () => {
        image.blur(5, 5);
        expect(pixelColor(image, 222, 60)).toBe('#ff6a6a');
    });

    it('should only blur the specified channel', () => {
        image.blur(5, 5, Channels.Green);
        expect(pixelColor(image, 222, 60)).toBe('#ff6a00');
    });
});