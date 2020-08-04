/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from '../../src/image-magick';
import { MagickImage } from '../../src/magick-image';
import { MagickColor } from '../../src/magick-color';

let image: MagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = new MagickImage();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#backgroundColor', () => {
    it('should return default background color', () => {
        image.read('rose:');
        const backgroundColor = image.backgroundColor;
        expect(backgroundColor.r).toBe(255);
        expect(backgroundColor.g).toBe(255);
        expect(backgroundColor.b).toBe(255);
        expect(backgroundColor.a).toBe(255);
    });

    it('should change background color', () => {
        image.read('rose:');
        image.backgroundColor = new MagickColor("black");
        const backgroundColor = image.backgroundColor;
        expect(backgroundColor.r).toBe(0);
        expect(backgroundColor.g).toBe(0);
        expect(backgroundColor.b).toBe(0);
        expect(backgroundColor.a).toBe(255);
    });
});