// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';
import { PixelCollection } from '../../src/pixels/pixel-collection';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = global.native;
    image = MagickImage.create();
    image.read('logo:');
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#getPixels', () => {
    it('should dispose pixel instance', () => {
        let pixels: PixelCollection | undefined;
        image.getPixels(p => {
            pixels = p as PixelCollection;
        });

        expect(pixels).toBeDefined();
        expect(() => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            pixels!._instance;
        }).toThrowError('instance is disposed');
    });
});
