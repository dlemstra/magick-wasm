// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = global.native;
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#constructor', () => {
    it('should create empty uninitialized instance', () => {
        expect(() => {
            image.resize(1, 1);
        }).toThrowError('NegativeOrZeroImageSize `\' @ error/image.c/CloneImage');
    });
});
