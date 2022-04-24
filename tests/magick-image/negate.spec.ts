// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

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

    it('should only negate specified channels', () => {
        image.read(MagickColors.Magenta, 1, 1);

        image.negate(Channels.Red);

        expect(image).toHavePixelWithColor(0, 0, MagickColors.Blue);
    });
});
