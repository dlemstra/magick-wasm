/* Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM */

import { ImageMagick } from '../../src/image-magick';
import { MagickImage } from '../../src/magick-image';

let image: MagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#constructor', () => {
    it('should create empty uninitialized instance', () => {
        expect(() => {
            image.resize(1, 1);
        }).toThrowError('NegativeOrZeroImageSize `\' @ error/image.c/CloneImage/798');
    });
});