// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import { MagickGeometry } from '../../src/magick-geometry';
import '../custom-matcher';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
    image.read('logo:');
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#liquidRescale', () => {
    it('should change the width of the image', () => {
        image.liquidRescale(400, 0);
        expect(image.width).toBe(400);
        expect(image.height).toBe(300);
    });

    it('should change the height of the image', () => {
        image.liquidRescale(0, 400);
        expect(image.width).toBe(533);
        expect(image.height).toBe(400);
    });

    it('with geometry should change the width of the image', () => {
        image.liquidRescale(new MagickGeometry(300, 0));
        expect(image.width).toBe(300);
        expect(image.height).toBe(225);
    });

    it('with geometry should change the height of the image', () => {
        image.liquidRescale(new MagickGeometry(0, 300));
        expect(image.width).toBe(400);
        expect(image.height).toBe(300);
        expect(image).toHavePixelWithColor(250, 280, '#ed1f24ff');
        expect(image).toHavePixelWithColor(174, 224, '#223e92ff');
    });
});
