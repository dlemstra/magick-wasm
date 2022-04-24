// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { AlphaOption } from '../../src/alpha-option';
import { Channels } from '../../src/channels';
import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import { MagickColors } from '../../src/magick-colors';
import '../custom-matcher';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#negate', () => {
    it('should negate the image', () => {
        image.read(MagickColors.Red, 1, 1);

        image.negate();

        expect(image).toHavePixelWithColor(0, 0, MagickColors.Cyan);
    });

    it('should only negate grascale when set to true', () => {
        image.read(MagickColors.Black, 2, 1);

        image.getPixels(pixels => {
            pixels.setPixel(1, 0, [255, 0, 0]);
        })

        image.negate(true);

        expect(image).toHavePixelWithColor(0, 0, MagickColors.White);
        expect(image).toHavePixelWithColor(1, 0, MagickColors.Red);
    });

    it('should only negate specified channels', () => {
        image.read(MagickColors.Magenta, 1, 1);

        image.negate(Channels.Red);

        expect(image).toHavePixelWithColor(0, 0, MagickColors.Blue);
    });

    it('should only negate grascale on specified channels when set to true ', () => {
        image.read(MagickColors.Black, 2, 1);
        image.alpha(AlphaOption.Opaque);

        image.getPixels(pixels => {
            pixels.setPixel(1, 0, [255, 0, 0]);
        })

        image.negate(true, Channels.All);

        expect(image).toHavePixelWithColor(0, 0, MagickColors.Transparent);
        expect(image).toHavePixelWithColor(1, 0, MagickColors.Red);
    });
});
