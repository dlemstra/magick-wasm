// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { AlphaOption } from '../../src/alpha-option';
import { Channels } from '../../src/channels';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import { MagickColors } from '../../src/magick-colors';

let image: IMagickImage;

beforeEach(() => {
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#negateGrayScale', () => {
    it('should only negate grayscale', () => {
        image.read(MagickColors.Black, 2, 1);

        image.getPixels(pixels => {
            pixels.setPixel(1, 0, [255, 0, 0]);
        })

        image.negateGrayScale();

        expect(image).toHavePixelWithColor(0, 0, MagickColors.White);
        expect(image).toHavePixelWithColor(1, 0, MagickColors.Red);
    });

    it('should only negate grascale on specified channels', () => {
        image.read(MagickColors.Black, 2, 1);
        image.alpha(AlphaOption.Opaque);

        image.getPixels(pixels => {
            pixels.setPixel(1, 0, [255, 0, 0]);
        })

        image.negateGrayScale(Channels.All);

        expect(image).toHavePixelWithColor(0, 0, MagickColors.Transparent);
        expect(image).toHavePixelWithColor(1, 0, MagickColors.Red);
    });
});
