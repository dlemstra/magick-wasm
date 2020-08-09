/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { AlphaOption } from '../../src/alpha-option';
import { ImageMagick } from '../../src/image-magick';
import { MagickImage } from '../../src/magick-image';

let image: MagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#alpha', () => {
    it('should enable alpha channel', () => {
        image.read('logo:');
        image.alpha(AlphaOption.On);
        expect(image.channelCount).toBe(5);
        expect(image.hasAlpha).toBe(true);
    });
});