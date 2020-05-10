/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from '../../src/image-magick';
import { MagickImage } from '../../src/magick-image';
import { MagickGeometry } from '../../src/types/magick-geometry';

let image: MagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = new MagickImage();
    image.read('logo:');
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#resize', () => {
    it('should change the width of the image', () => {
        image.resize(400, 0);
        expect(image.width).toEqual(400);
        expect(image.height).toEqual(300);
    });

    it('should change the height of the image', () => {
        image.resize(0, 400);
        expect(image.width).toEqual(533);
        expect(image.height).toEqual(400);
    });

    it('with geometry should change the width of the image', () => {
        image.resize(new MagickGeometry(300, 0));
        expect(image.width).toEqual(300);
        expect(image.height).toEqual(225);
    });

    it('with geometry should change the height of the image', () => {
        image.resize(new MagickGeometry(0, 300));
        expect(image.width).toEqual(400);
        expect(image.height).toEqual(300);
    });
});