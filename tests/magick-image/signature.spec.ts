// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';

let image: IMagickImage;

beforeAll(() => {
    ImageMagick._api = global.native;
});

beforeEach(() => {
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#signature', () => {
    it('should return signature when image has not been loaded', () => {
        const signature = image.signature;
        expect(signature).toBe('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
    });

    it('should return signature of image', () => {
        image.read('logo:');
        const signature = image.signature;
        expect(signature).toBe('1bed3c29f223f8c525206258d9601dd5da0bb572943b04bd6ad09ae5dc786d9d');
    });
});
