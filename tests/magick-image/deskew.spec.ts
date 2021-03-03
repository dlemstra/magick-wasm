// Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { MagickImage } from '../../src/magick-image';
import { Percentage } from '../../src/percentage';
import { colorAssert } from '../color-assert';
import { MagickColors } from '../../src/magick-colors';

let image: MagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
    image.read('logo:');
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#deskew', () => {
    it('should rotate the image', () => {
        image.deskew(new Percentage(4.2));

        colorAssert(image, 158, 16, MagickColors.Black);
    });

    it('should return the angle', () => {
        const angle = image.deskew(new Percentage(42));
        expect(angle).toEqual(0.8951737102110744);
    });
});