// Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { MagickImage } from '../../src/magick-image';
import { PixelCollection } from '../../src/pixels/pixel-collection';

let image: MagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
    image.read('logo:');
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#getPixels', () => {
    it('should dispose pixel instance', () => {
        let pixels: PixelCollection | undefined = undefined;
        image.getPixels((p) => {
            pixels = p
        });

        expect(pixels).toBeDefined();
        expect(() => {
            pixels!._instance
        }).toThrowError('instance is disposed');
    });
});