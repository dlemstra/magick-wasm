// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import { MagickColors } from '../../src/magick-colors';
import '../custom-matcher'

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = global.native;
    image = MagickImage.create();
    image.read('logo:');
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#rotate', () => {
    it('should rotate the image', () => {
        image.rotate(90);

        expect(image.width).toBe(480);
        expect(image.height).toBe(640);
    });

    it('should change the dimensions of the image', () => {
        image.backgroundColor = MagickColors.Pink;
        image.rotate(45);

        expect(image.width).toBe(794);
        expect(image.height).toBe(794);
        expect(image).toHavePixelWithColor(0, 0, MagickColors.Pink)
    });
});
