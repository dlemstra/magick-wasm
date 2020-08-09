/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from '../../src/image-magick';
import { MagickColors } from '../../src/magick-colors';
import { MagickImage } from '../../src/magick-image';

let image: MagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#backgroundColor', () => {
    it('should the background color of the image', () => {
        image.read('rose:');
        const backgroundColor = image.backgroundColor;
        expect(backgroundColor.r).toBe(255);
        expect(backgroundColor.g).toBe(255);
        expect(backgroundColor.b).toBe(255);
        expect(backgroundColor.a).toBe(255);
    });

    it('should change background color', () => {
        image.read('rose:');
        image.backgroundColor = MagickColors.Black;
        const backgroundColor = image.backgroundColor;
        expect(backgroundColor.r).toBe(0);
        expect(backgroundColor.g).toBe(0);
        expect(backgroundColor.b).toBe(0);
        expect(backgroundColor.a).toBe(255);
    });
});