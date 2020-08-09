/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from '../../src/image-magick';
import { MagickImage } from '../../src/magick-image';
import { Channels } from '../../src/channels';
import { colorAssert } from '../color-assert';

let image: MagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
    image.read('logo:');
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#blur', () => {
    it('should change pixels of the image', () => {
        image.blur(5, 5);
        colorAssert(image, 222, 60, '#ff6a6a');
    });

    it('should only blur the specified channel', () => {
        image.blur(5, 5, Channels.Green);
        colorAssert(image, 222, 60, '#ff6a00');
    });
});