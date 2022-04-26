// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { Channels } from '../../src/channels';
import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import { MagickColor } from '../../src/magick-color';
import { MagickColors } from '../../src/magick-colors';
import { Percentage } from '../../src/percentage';
import '../custom-matcher';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
    image.read("wizard:");
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#contrastStretch', () => {
    it('should stretch the image contrast to the given blackpoint', () => {
        image.contrastStretch(new Percentage(10));

        expect(image).toHavePixelWithColor(160, 300, new MagickColor(10, 24, 179));
        expect(image).toHavePixelWithColor(325, 175, new MagickColor(255, 251, 206));
    });

    it('should stretch the image contrast to the given blackpoint and whitepoint', () => {
        image.contrastStretch(new Percentage(50), new Percentage(80));

        expect(image).toHavePixelWithColor(160, 300, MagickColors.Black);
        expect(image).toHavePixelWithColor(325, 175, MagickColors.Red);
    });

    it('should stretch the image contrast of specified channels to the given blackpoint and whitepoint', () => {
        image.contrastStretch(new Percentage(0), new Percentage(0), Channels.Blue);

        expect(image).toHavePixelWithColor(160, 300, new MagickColor(81, 91, 199));
        expect(image).toHavePixelWithColor(325, 175, new MagickColor(255, 252, 219));
    });
});
