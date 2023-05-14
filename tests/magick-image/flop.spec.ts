// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { IMagickImageCollection, MagickImageCollection } from '../../src/magick-image-collection';
import { MagickColors } from '../../src/magick-colors';
import { MagickImage } from '../../src/magick-image';

let images: IMagickImageCollection;

beforeEach(() => {
    images = MagickImageCollection.create();
});

afterEach(() => {
    images.dispose();
});

describe('MagickImage#flop', () => {
    it('should flop the image', () => {
        images.push(MagickImage.create(MagickColors.Red, 2, 1));
        images.push(MagickImage.create(MagickColors.Blue, 1, 1));

        images.appendHorizontally(image => {
            expect(image).toHavePixelWithColor(0, 0, MagickColors.Red);
            expect(image).toHavePixelWithColor(1, 0, MagickColors.Red);
            expect(image).toHavePixelWithColor(2, 0, MagickColors.Blue);

            image.flop();

            expect(image).toHavePixelWithColor(0, 0, MagickColors.Blue);
            expect(image).toHavePixelWithColor(1, 0, MagickColors.Red);
            expect(image).toHavePixelWithColor(2, 0, MagickColors.Red);
        });
    });
});
