// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { AlphaOption } from '../../src/alpha-option';
import { ImageMagick } from '../../src/image-magick';
import { IMagickImage, MagickImage } from '../../src/magick-image';

let image: IMagickImage;

beforeEach(() => {
    ImageMagick._api = (global as any).native;
    image = MagickImage.create();
});

afterEach(() => {
    image.dispose();
});

describe('MagickImage#alpha', () => {
    it('should enable alpha channel', () => {
        image.read('logo:');
        image.alpha(AlphaOption.On);
        expect(image.channelCount).toBe(5);
        expect(image.hasAlpha).toBe(true);
    });
});
